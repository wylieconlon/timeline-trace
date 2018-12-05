import React, { Component } from 'react';

import Exercise from '../Exercise';
import variableAssign from '../samples/variableAssign';

class Exercise1 extends Component {
  render() {
    return <div>
      <h1>Variables</h1>

      <p>
        A variable is a named value which is used by a program. You can assign a value to
        variables.
      </p>

      <p>
        This exercise lets you see what the computer stores inside a named variable. try
        writing a new line of code to change the value of <strong>totalAge</strong>
      </p>

      <Exercise code={variableAssign} />
    </div>;
  }
}

export default Exercise1;