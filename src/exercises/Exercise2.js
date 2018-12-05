import React, { Component } from 'react';

import Exercise from '../Exercise';
import clickhandling from '../samples/clickhandling';

class Exercise2 extends Component {
  render() {
    return <div>
      <Exercise code={clickhandling} />
    </div>;
  }
}

export default Exercise2;