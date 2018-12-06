import React, { Component } from 'react';

import Exercise from '../Exercise';
import variableLoops from '../samples/variableLoops';

class ExerciseVariableCounter extends Component {
  render() {
    return <div>
      <Exercise code={variableLoops}>
        <h1>Using a variable as a counter</h1>
      </Exercise>
    </div>;
  }
}

export default ExerciseVariableCounter;