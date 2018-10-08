import visitor from "./visitor.js";

describe("Structure of tracking calls", function() {
  let __tracker;

  beforeEach(function() {
    __tracker = jest.fn();
  });

  it("Tracks that a variable is declared", function() {
    const code = visitor(`var x = 5;`).code;

    eval(code);

    const calls = __tracker.mock.calls;

    expect(calls.length).toEqual(1);
    expect(calls[0]).toEqual(expect.arrayContaining(['assignment', 'x', 5]));
  });
});

