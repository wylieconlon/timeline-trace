import visitor from "./visitor.js";

describe("Structure of tracking calls", function() {
  let __tracker;

  beforeEach(function() {
    __tracker = jest.fn();
  });

  it("Tracks that a variable is declared", function() {
    const code = visitor(`var x = 5;`);

    eval(code);

    const calls = __tracker.mock.calls;

    expect(calls.length).toEqual(1);
    expect(calls[0]).toEqual(expect.arrayContaining(['assignment', 'x', '1,4,1,5', 5]));
  });

  it("Tracks multiple branches of an if else", function() {
    const code = visitor(`
var x = 3;
if (x === 1) {
} else if (x === 2) {
} else if (x === 5) {
} else {}
    `);

    eval(code);

    const calls = __tracker.mock.calls;

    expect(calls.length).toEqual(5);
    expect(calls).toContainEqual(['condition', 'x === 1', '3,4,3,11', false]);
    expect(calls).toContainEqual(['condition', 'x === 2', '4,11,4,18', false]);
    expect(calls).toContainEqual(['condition', 'x === 5', '5,11,5,18', false]);
    expect(calls).toContainEqual(['condition', 'else condition', '6,7,6,9']);
  });

  it("Tracks the return value of functions", function() {
    const code = visitor(`
function len(str) {
  return str.length;
}
len('hello');
    `);

    eval(code);

    const calls = __tracker.mock.calls;

    expect(calls.length).toEqual(2);
    expect(calls).toContainEqual(['return', 'str.length', '3,2,3,20', 5]);
  });
});
