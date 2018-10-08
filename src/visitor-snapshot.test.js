const visitor = require("./visitor.js");

describe("Generated source from inputs", function() {
  it("Adds a tracking call for var creation", function() {
    const result = visitor(`var x;`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "var x;

__tracker(\\"assignment\\", \\"x\\", {
  start: {
    line: 1,
    column: 4
  },
  end: {
    line: 1,
    column: 5
  }
}, x);",
  "map": null,
  "rawMappings": null,
}
`);
  });

  it("Adds a tracking call for var assignment", function() {
    const result = visitor(`x = 5;`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "x = 5;

__tracker(\\"assignment\\", \\"x\\", {
  start: {
    line: 1,
    column: 0
  },
  end: {
    line: 1,
    column: 1
  }
}, x)",
  "map": null,
  "rawMappings": null,
}
`);
  });

  it("Adds a tracking call for complex assignment", function() {
    const result = visitor(`document.body.innerText = 'hello';`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "document.body.innerText = 'hello';

__tracker(\\"assignment\\", \\"document.body.innerText\\", {
  start: {
    line: 1,
    column: 0
  },
  end: {
    line: 1,
    column: 23
  }
}, \\"'hello'\\")",
  "map": null,
  "rawMappings": null,
}
`);
  });

  it("Adds tracking for conditional", function() {
    const result = visitor(`
      if (x === y || y > z) {
        doFirst();
      } else {
        doSecond();
      }`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "let _if = x === y || y > z;

__tracker(\\"condition\\", \\"x === y || y > z\\", {
  start: {
    line: 2,
    column: 10
  },
  end: {
    line: 2,
    column: 26
  }
}, _if);

if (_if) {
  doFirst();
} else {
  doSecond();
}",
  "map": null,
  "rawMappings": null,
}
`);
  });

  it("Adds tracking to named function calls", function() {
    const result = visitor(`function myFunction(a, b, c) {}`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "function myFunction(a, b, c) {
  __tracker(\\"fncall\\", \\"myFunction\\", {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 31
    }
  }, a, b, c)
}",
  "map": null,
  "rawMappings": null,
}
`);
  });

  it("Adds tracking to anonymous function calls", function() {
    const result = visitor(`getResult(function(a, b) {});`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "getResult(function (a, b) {
  __tracker(\\"fncall\\", \\"Anonymous Function\\", {
    start: {
      line: 1,
      column: 10
    },
    end: {
      line: 1,
      column: 27
    }
  }, a, b)
});",
  "map": null,
  "rawMappings": null,
}
`);
  });
});
