import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/runmode/colorize';

import links from './links';

class Home extends Component {
  render() {
    return <div>

      <div>
        <h1>Exploring Javascript in an interactive way</h1>

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

        <code><pre data-lang="javascript">{`
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
        {links.map((link) => {
          return <div key={link.url}>
            <Link to={link.url}>{link.title}</Link>
          </div>;
        })}
      </div>
    </div>;
  }

  componentDidMount() {
    CodeMirror.colorize();
  }
}

export default Home;
