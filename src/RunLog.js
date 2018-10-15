import React, { Component } from 'react';

import isMatchingLocation from './matchingLocation';
import getChangesOverTime from './getChangesOverTime';

class RunLog extends Component {
  render() {
    const changes = getChangesOverTime(this.props.loggedEvents);
    return (
      <div className="runlog" onMouseOut={this.handleMouseOut.bind(this)}>
        <div className="runlog-variables">
          {changes.map(({ name, values }) => {
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
          })}
        </div>

        <div className='runlog-lines'>
          {this.props.loggedEvents.map((event, index) => {
            const text = this.getTextForEvent(event, index);
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

  getTextForEvent({ type, name, loc, args }, index) {
    if (type === 'assignment') {
      return `Step ${index + 1}: Assign ${name} to "${args[0]}" on line ${loc.start.line}`;
    } else if (type === 'fncall') {
      return `Step ${index + 1}: Call ${name} on line ${loc.start.line} with arguments: ${args.join(', ')}`;
    } else if (type === 'block') {
      return `Step ${index + 1}: Run branch on line ${loc.start.line}`;
    } else if (type === 'condition' && name === 'else condition') {
      return `Step ${index + 1}: No other conditions met, else branch on line ${loc.start.line} was run`;
    } else if (type === 'condition') {
      return `Step ${index + 1}: Condition ${name} on line ${loc.start.line} had result: ${args[0]}`;
    } else {
      return `Step ${index + 1}`;
    }
  }

  handleMouseOver(index) {
    this.props.onHover(index);
  }

  handleMouseOut() {
    this.props.onHoverEnd();
  }
}

export default RunLog;