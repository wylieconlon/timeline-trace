# Timeline Trace

Instruments and visualizes execution of JS code. Supports detailed
tracking of:

* Values of each variable
* Function calls
* Loops
* Conditions

# Setup

```
npm install
npm run build
npm run watch
```

This project uses a node server to run, as the project uses HTML5 routing:

```
npm run start
```

# Testing

```
npm run test
```

## How it works

There are two parts to this project, the tracking code, and the visualization of the code. 
The code in `src/core` rewrites a string of Javascript and inserts calls to the function
`__tracking()` whenever:

* A variable is assigned
* A function is calls
* A loop is run
* A branch of a condition is run

And the implementation of `__tracking()` in `src/core/runtime.js` sends a message to a host
iframe, but you could use your own implmentation to create custom visualizations of code
or integrate into an IDE.

## Example

Input:

```
var x;
```

Output:

``` 
try { var x;

__tracker("assignment", "x", "1,4,1,5", x); } catch (e) { console.error(e); }
```

Input:

```
if (x === y) {
  doSomething();
} else {
  doNothing();
}
```

Output:

```
try { let _if = x === y;

__tracker("condition", "x === y", "1,4,1,11", _if);

if (_if) {
  doSomething();
} else {
  __tracker("condition", "else condition", "3,7,5,1");

  doNothing();
} } catch (e) { console.error(e); }
```