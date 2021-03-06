import visitor from "./visitor.js";

describe("Generated source from inputs", function() {
  it("Adds a tracking call for var creation", function() {
    const result = visitor(`var x;`);
    expect(result).toMatchInlineSnapshot(`
"try {
    var x;

__tracker(\\"assignment\\", \\"x\\", \\"1,4,1,5\\", x);
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds a tracking call for var assignment", function() {
    const result = visitor(`x = 5;`);
    expect(result).toMatchInlineSnapshot(`
"try {
    x = 5;

__tracker(\\"assignment\\", \\"x\\", \\"1,0,1,1\\", x)
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds a tracking call for complex assignment", function() {
    const result = visitor(`document.body.innerText = 'hello';`);
    expect(result).toMatchInlineSnapshot(`
"try {
    document.body.innerText = 'hello';

__tracker(\\"assignment\\", \\"document.body.innerText\\", \\"1,0,1,23\\", \\"'hello'\\")
} catch (e) { console.error(e); }
"
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
"try {
    let _if = x === y || y > z;

__tracker(\\"condition\\", \\"x === y || y > z\\", \\"2,10,2,26\\", _if);

if (_if) {
  doFirst();
} else {
  __tracker(\\"condition\\", \\"else condition\\", \\"4,13,6,7\\");

  doSecond();
}
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds tracking to named function calls", function() {
    const result = visitor(`function myFunction(a, b, c) {}`);
    expect(result).toMatchInlineSnapshot(`
"try {
    function myFunction(a, b, c) {
  __tracker(\\"fncall\\", \\"myFunction\\", \\"1,0,1,31\\", a, b, c)
}
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds tracking to anonymous function calls", function() {
    const result = visitor(`getResult(function(a, b) {});`);
    expect(result).toMatchInlineSnapshot(`
"try {
    getResult(function (a, b) {
  __tracker(\\"fncall\\", \\"Anonymous Function\\", \\"1,10,1,27\\", a, b)
});
} catch (e) { console.error(e); }
"
`);
  });

  it("Handles multiple if else branches", function() {
    const result = visitor(`
if (a === null) {
} else if (b === null) {
} else {
}
    `);
    expect(result).toMatchInlineSnapshot(`
"try {
    let _if = a === null;

__tracker(\\"condition\\", \\"a === null\\", \\"2,4,2,14\\", _if);

let _if2 = b === null;

__tracker(\\"condition\\", \\"b === null\\", \\"3,11,3,21\\", _if2);

if (_if) {} else if (_if2) {} else {
  __tracker(\\"condition\\", \\"else condition\\", \\"4,7,5,1\\");
}
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds tracking to do while", function() {
    const result = visitor(`
do {
} while (a < 5);
    `);
    expect(result).toMatchInlineSnapshot(`
"try {
    do {
  __tracker(\\"block\\", \\"_uid\\", \\"2,3,3,1\\")
} while (a < 5);
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds tracking to return statement", function() {
    const result = visitor(`
function myFunc(a) {
  return a.length;
}
    `);
    expect(result).toMatchInlineSnapshot(`
"try {
    function myFunc(a) {
  __tracker(\\"fncall\\", \\"myFunc\\", \\"2,0,4,1\\", a)

  let _retValue = a.length;

  __tracker(\\"return\\", \\"a.length\\", \\"3,2,3,18\\", _retValue);

  return _retValue;
}
} catch (e) { console.error(e); }
"
`);
  });

  it("Adds tracking to arrow function", function() {
    const result = visitor(`
(a) => {
  return a.length;
}
    `);
    expect(result).toMatchInlineSnapshot(
      "",
      `
"try {
    a => {
  (__tracker(\\"fncall\\", \\"Anonymous Function\\", \\"2,0,4,1\\", a), __tracker(\\"block\\", \\"_uid\\", \\"2,7,4,1\\"))
  let _retValue = a.length;

  __tracker(\\"return\\", \\"a.length\\", \\"3,2,3,18\\", _retValue);

  return _retValue;
};
} catch (e) { console.error(e); }
"
`
    );
  });
});
