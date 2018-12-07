import React, { Component } from 'react';

import Exercise from '../Exercise';
import variableAssign from '../samples/variableAssign';

const assignExample = `
var myVariable;
myVariable = 10;
`;

class ExerciseVariables extends Component {
  render() {
    return <div>
      <Exercise code={variableAssign}>
        <h1>Using variables to count age</h1>

        <p>
          A variable is a <strong>named value</strong> which is used by a program, which
          you can <strong>assign a value to</strong>. You can change the value, and read from the
          current value.
        </p>

        <p>To declare a variable:</p>

        <pre><code>var myVariable;</code></pre>

        <p>To assign a variable:</p>

        <pre><code>myVariable = 10;</code></pre>

        <p>To read from a variable, <strong>write its name</strong>:</p>

        <pre><code>myVariable = myVariable + 50;</code></pre>

        <p>
          This program starts with a variable called <strong>totalAge</strong> which
          is assigned a value of 30. Can you write code that will
          <strong> assign totalAge to your age + totalAge</strong>?
        </p>

        <p>
          If you finish that, try adding the ages of everyone in your family.
        </p>

        <p>
          <strong>Bonus challenge:</strong> Assign a new variable to be the <strong>average age</strong>
          of all the above.
        </p>
      </Exercise>
    </div>;
  }
}

export default ExerciseVariables;