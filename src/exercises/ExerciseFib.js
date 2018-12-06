import React, { Component } from 'react';

import Exercise from '../Exercise';

let fibonacci = `
function fib(num){
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

document.body.innerText = fib(10);
`;

class ExerciseFib extends Component {
  render() {
    return <div>
      <Exercise code={fibonacci}>
        <h1>Fibonacci</h1>

        <p>
          This code defines the function <strong>fib(n)</strong>.
        </p>
      </Exercise>
    </div>;
  }
}

export default ExerciseFib;