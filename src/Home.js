import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return <div>

      <div>
        <h1>Timeline Trace</h1>

        <p>
          These exercises are an exploration intended to help Javascript developers
          understand their code in a more visual way. Some of these exercises are
          especially useful for beginners, while others are meant for more advanced
          use.
        </p>

        <p>
          In this project, the idea of a "step" in a program is used to represent
          an order of operations. A step is not the same as a line of code.
          For example, in the following program there are three steps that are tracked:
        </p>

        <code><pre>{`
function doSomething(input) {
  return input.length;
}
var name = document.querySelector('input').value;
if (name !== 'alex') {
  console.log(doSomething(name));
}
        `}</pre></code>

        <ol>
          <li>Name is assigned to the value of a user input</li>
          <li>A condition is checked</li>
          <li>The function <code>doSomething</code> is called with an argument</li>
        </ol>

        <p>
          You may notice that the function defined inside the code is tracked, but
          functions like <code>console.log</code> and <code>document.querySelector</code>
          &nbsp; are not tracked.
        </p>
      </div>

      <div>
        <h3>Variables</h3>
        <ul>
          <li><Link to="/exercise/variables">What is a variable?</Link></li>
          <li><Link to="/exercise/variablecounter">Using a variable as a counter</Link></li>
        </ul>

        <h3>User Interaction</h3>
        <ul>
          <li><Link to="/exercise/typing">Key events</Link></li>
          <li><Link to="/exercise/clickhandling">Click handling</Link></li>
        </ul>

        <h3>Algorithms</h3>
        <ul>
          <li><Link to="/exercise/fizzbuzz">Fizzbuzz</Link></li>
          <li><Link to="/exercise/fib">Fibonacci</Link></li>
        </ul>

        <h3>Playground</h3>
        <p>Try writing your own code</p>
        <ul>
          <li><Link to="/playground">Playground</Link></li>
        </ul>
      </div>
    </div>;
  }
}

export default Home;
