import React, { Component } from 'react';

class RunLog extends Component {
  render() {
    return (
      <div className="runlog" onMouseOut={this.handleMouseOut.bind(this)}>
        {this.props.loggedEvents.map(this.getTextForEvent).map((text, index) =>
          <div key={index} onMouseOver={this.handleMouseOver.bind(this, index)}>
            {text}
          </div>
        )}
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