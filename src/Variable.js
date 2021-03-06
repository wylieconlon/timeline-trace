import React, { PureComponent } from 'react';

import Numeric from './visualizers/Numeric';
import isMatchingLocation from './util/matchingLocation';

class Variable extends PureComponent {
  render() {
    const values = this.props.values;
    const name = this.props.name;

    const isNumeric = values.every((v) => v.value === 'undefined' || !isNaN(parseInt(v.value)));
    if (isNumeric && values.length > 1) {
      return <div key={`changes-${name}`}>
        <div className="visualizer-variableName">{name}</div>
        <Numeric data={values} />
      </div>
    } else {
      return (<div className="visualizer-variable" key={`changes-${name}`}>
        <div className="visualizer-variableName">{name}</div>
        <ul>
          {values.map(({ step, value, loc }) => {
            let isFocused = isMatchingLocation(
              loc,
              this.props.focusedLocation
            );
            return (<li
              className={`${isFocused ? 'is-focused' : ''}`}
              key={`step-${step}`}
            >
              Step {step}: {value}
            </li>);
          })}
        </ul>
      </div>);
    }
  }
}

export default Variable;
