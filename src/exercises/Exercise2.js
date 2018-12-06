import React, { Component } from 'react';

import Exercise from '../Exercise';
import variableLoops from '../samples/variableLoops';

class Exercise2 extends Component {
  render() {
    return <div>
      <h1>Using a variable as a counter</h1>

      <Exercise code={variableLoops} />
    </div>;
  }
}

export default Exercise2;