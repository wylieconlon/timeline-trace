import visitor from "./visitor.js";

describe("Generated source from inputs", function() {
  it("Adds a tracking call for var creation", function() {
    const result = visitor(`var x;`);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "var x;

__tracker(\\"assignment\\", \\"x\\", \\"1,4,1,5\\", x);",
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

__tracker(\\"assignment\\", \\"x\\", \\"1,0,1,1\\", x)",
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

__tracker(\\"assignment\\", \\"document.body.innerText\\", \\"1,0,1,23\\", \\"'hello'\\")",
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

__tracker(\\"condition\\", \\"x === y || y > z\\", \\"2,10,2,26\\", _if);

if (_if) {
  doFirst();
} else {
  __tracker(\\"condition\\", \\"else condition\\", \\"4,13,6,7\\");

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
  __tracker(\\"fncall\\", \\"myFunction\\", \\"1,0,1,31\\", a, b, c)
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
  __tracker(\\"fncall\\", \\"Anonymous Function\\", \\"1,10,1,27\\", a, b)
});",
  "map": null,
  "rawMappings": null,
}
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
Object {
  "code": "let _if = a === null;

__tracker(\\"condition\\", \\"a === null\\", \\"2,4,2,14\\", _if);

let _if2 = b === null;

__tracker(\\"condition\\", \\"b === null\\", \\"3,11,3,21\\", _if2);

if (_if) {} else if (_if2) {} else {
  __tracker(\\"condition\\", \\"else condition\\", \\"4,7,5,1\\");
}",
  "map": null,
  "rawMappings": null,
}
`);
  });

  it("Adds tracking to do while", function() {
    const result = visitor(`
do {
} while (a < 5);
    `);
    expect(result).toMatchInlineSnapshot(`
Object {
  "code": "do {
  __tracker(\\"block\\", \\"_uid\\", \\"2,3,3,1\\")
} while (a < 5);",
  "map": null,
  "rawMappings": null,
}
`);
  });
});
