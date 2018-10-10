import React, { Component } from 'react';

import isMatchingLocation from './matchingLocation';

class RunLog extends Component {
  render() {
    return (
      <div className="runlog" onMouseOut={this.handleMouseOut.bind(this)}>
        {this.props.loggedEvents.map((event, index) => {
          const text = this.getTextForEvent(event, index);
          const isFocused = isMatchingLocation(event.loc, this.props.focusedLocation);
          return (<div className={`runlog-item ${isFocused && 'is-focused'}`}
            key={index} onMouseOver={this.handleMouseOver.bind(this, index)}
          >
            {text}
          </div>);
        })}
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