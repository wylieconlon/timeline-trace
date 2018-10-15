import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as types from '@babel/types';
import generate from '@babel/generator';

function shrinkLocation(loc) {
  const locations = [
    loc && loc.start.line,
    loc && loc.start.column,
    loc && loc.end.line,
    loc && loc.end.column
  ];

  return locations.join(',');
}

function visitor(code) {
  const originalAst = parse(code);

  // TODO: Statically assign names to all anonymous functions and scope-specific variables
  // TODO: Insert code at the top of the original source to track ranges of characters

  const visit = {
    'FunctionDeclaration|FunctionExpression': {
      exit(path) {
        const functionName = path.node.id ? path.node.id.name : 'Anonymous Function';

        const trackArguments = types.callExpression(
          types.identifier('__tracker'),
          [
            types.stringLiteral('fncall'),
            types.stringLiteral(functionName),
            types.stringLiteral(shrinkLocation(path.node.loc)),
          ].concat(path.node.params)
        );

        path.get('body').unshiftContainer('body', trackArguments);
      }
    },

    AssignmentExpression(path) {
      let trackSelf;

      if (!types.isIdentifier(path.node.left)) {
        // Left side of expression might be a member operator or some other
        // compositional expression
        trackSelf = types.callExpression(
          types.identifier('__tracker'),
          [
            types.stringLiteral('assignment'),
            types.stringLiteral(path.get('left').toString()),
            types.stringLiteral(shrinkLocation(path.node.left.loc)),
            // TODO: Assign this value to a temporary variable to track it
            types.stringLiteral(path.get('right').toString()),
          ]
        );
      } else {
        trackSelf = types.callExpression(
          types.identifier('__tracker'),
          [
            types.stringLiteral('assignment'),
            types.stringLiteral(path.node.left.name),
            types.stringLiteral(shrinkLocation(path.node.left.loc)),
            path.node.left
          ]
        );
      }

      path.parentPath.insertAfter(trackSelf);
    },

    ForStatement(path) {
      if (types.isVariableDeclaration(path.node.init)) {
        const trackers = [];

        path.get('init').get('declarations').forEach((subpath) => {
          const id = subpath.node.id;

          const trackSelf = types.expressionStatement(types.callExpression(
            types.identifier('__tracker'),
            [
              types.stringLiteral('assignment'),
              types.stringLiteral(id.name),
              types.stringLiteral(shrinkLocation(id.loc)),
              id
            ]
          ));

          path.get('body').unshiftContainer('body', trackSelf);
        });
      }
    },

    VariableDeclaration(path) {
      if (types.isForStatement(path.parentPath)) {
        return;
      }

      path.get('declarations').forEach((subpath) => {
        const id = subpath.node.id;

        if (!id.loc) {
          // Generated code doesn't have a source location
          return;
        }

        const trackSelf = types.expressionStatement(types.callExpression(
          types.identifier('__tracker'),
          [
            types.stringLiteral('assignment'),
            types.stringLiteral(id.name),
            types.stringLiteral(shrinkLocation(id.loc)),
            id
          ]
        ));

        path.insertAfter(trackSelf);
      });
    },

    IfStatement(path) {
      // Saves the test result to a variable so we can log the conditions

      const test = path.node.test;
      if (!types.isExpression(test)) {
        return;
      }

      const storeTestResult = path.scope.generateUidIdentifier('if');
      const assignTestResult = types.variableDeclaration(
        'let',
        [types.variableDeclarator(
          storeTestResult,
          path.node.test
        )]
      );

      const trackSelf = types.expressionStatement(types.callExpression(
        types.identifier('__tracker'),
        [
          types.stringLiteral('condition'),
          types.stringLiteral(path.get('test').toString()),
          types.stringLiteral(shrinkLocation(path.node.test.loc)),
          storeTestResult
        ]
      ));

      const alternate = path.node.alternate;
      if (alternate && !types.isIfStatement(alternate)) {
        const trackAlternate = types.expressionStatement(types.callExpression(
          types.identifier('__tracker'),
          [
            types.stringLiteral('condition'),
            types.stringLiteral('else condition'),
            types.stringLiteral(shrinkLocation(alternate.loc)),
          ]
        ));

        path.get('alternate').unshiftContainer('body', trackAlternate);
      }

      const statementParent = path.getStatementParent();
      statementParent.insertBefore(assignTestResult);
      statementParent.insertBefore(trackSelf);
      path.get('test').replaceWith(storeTestResult);
    },

    BlockStatement(path) {
      if (types.isFunctionDeclaration(path.parent) ||
        types.isFunctionExpression(path.parent) ||
        types.isIfStatement(path.parent)) {
        return;
      }

      const uid = path.scope.generateUidIdentifier('uid');
      const trackArguments = types.callExpression(
        types.identifier('__tracker'),
        [
          types.stringLiteral('block'),
          types.stringLiteral(uid.name),
          types.stringLiteral(shrinkLocation(path.node.loc))
        ]
      );

      path.unshiftContainer('body', trackArguments);
    },
  };

  traverse(originalAst, visit, null);

  return generate(originalAst, code);
}

export default visitor;
