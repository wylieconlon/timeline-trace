import React, { Component } from 'react';

import Exercise from '../Exercise';
import clickhandling from '../samples/clickhandling';

class Exercise3 extends Component {
  render() {
    return <div>
      <Exercise code={clickhandling}>
        <h1>Asynchronous Event Handling</h1>

        <p>
          When a user interacts with elements in your website, an event is triggered. you
          can capture the event by adding an <strong>event listener</strong>. Click the
          button in the example below to see how an event listener is called:
        </p>
      </Exercise>
    </div>;
  }
}

export default Exercise3;