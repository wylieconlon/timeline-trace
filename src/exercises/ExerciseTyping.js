import React, { Component } from 'react';

import Exercise from '../Exercise';

const typing = `
let key;
window.addEventListener('keydown', function(e) {
  key = e.key;
});
`;

class ExerciseTyping extends Component {
  render() {
    return <div>
      <Exercise code={typing}>
        <h1>Visualizing User Input</h1>

        <p>
          Click inside the <strong>Output</strong> element, and then type any characters.
        </p>
      </Exercise>
    </div>;
  }
}

export default ExerciseTyping;