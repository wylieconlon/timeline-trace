import React, { Component } from 'react';

import Exercise from '../Exercise';
import fizzbuzz from '../samples/fizzbuzz';

class ExerciseFizzbuzz extends Component {
  render() {
    return <div>
      <Exercise javascript={fizzbuzz}>
        <h1>Fizzbuzz</h1>
      </Exercise>
    </div>;
  }
}

export default ExerciseFizzbuzz;