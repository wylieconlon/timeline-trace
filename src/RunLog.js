import React, { Component } from 'react';

import Numeric from './visualizers/Numeric';
import getTextForEvent from './util/getTextForEvent';
import isMatchingLocation from './util/matchingLocation';
import getChangesOverTime from './util/getChangesOverTime';

class RunLog extends Component {
  render() {
    const changes = getChangesOverTime(this.props.loggedEvents);
    return (
      <div className="runlog" onMouseOut={this.handleMouseOut.bind(this)}>
        <div className="runlog-variables">
          {changes.map(({ name, values }) => {
            const isNumeric = values.every((v) => v.value === 'undefined' || !isNaN(parseInt(v.value)));
            if (isNumeric && values.length > 1) {
              return <div key={`changes-${name}`}>
                <div className="runlog-variableName">{name}</div>
                <Numeric data={values} />
              </div>
            } else {
              return (<div className="runlog-variable" key={`changes-${name}`}>
                <div className="runlog-variableName">{name}</div>
                <ul>
                  {values.map(({ step, value, loc }) => {
                    let isFocused = isMatchingLocation(
                      loc,
                      this.props.focusedLocation
                    );
                    return (<li
                      className={`${isFocused ? 'is-focused' : ''}`}
                      key={`step-${step}`}
                      onMouseOver={this.handleMouseOver.bind(this, step - 1)}
                    >
                      Step {step}: {value}
                    </li>);
                  })}
                </ul>
              </div>);
            }
          })}
        </div>

        <div className='runlog-lines'>
          {this.props.loggedEvents.map((event, index) => {
            const text = getTextForEvent(event, index);
            const isFocused = isMatchingLocation(
              event.loc,
              this.props.focusedLocation
            );
            return (<div className={`runlog-item ${isFocused && 'is-focused'}`}
              key={`runlog-${index}`} onMouseOver={this.handleMouseOver.bind(this, index)}
            >
              {text}
            </div>);
          })}
        </div>
      </div>
    );
  }

  handleMouseOver(index) {
    this.props.onHover(index);
  }

  handleMouseOut() {
    this.props.onHoverEnd();
  }
}

export default RunLog;