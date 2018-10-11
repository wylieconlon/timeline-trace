import React, { Component } from 'react';

import isMatchingLocation from './matchingLocation';

class Timeline extends Component {
  render() {
    const dots = this.makeDotTimeline();
    return <div className="timeline"
      onMouseOut={this.props.onHoverEnd.bind(this)}
    >
      {dots}
    </div>;
  }

  sendHoverEvents(index) {
    if (typeof index !== undefined) {
      this.props.onHover(index);
    }
  }

  makeDotTimeline() {
    let maxLine = 0;
    this.props.loggedEvents.forEach(({ loc }) => {
      if (loc.start.line > maxLine) {
        maxLine = loc.start.line;
      }
    });

    const output = [];
    const columns = [];

    const lineNumbers = [];
    for (let i = 0; i < maxLine; i++) {
      lineNumbers.push(<div className="timeline-row"
        key={`line-${i}`}
      >
        {i+1}
      </div>);
    }
    output.push(<div className="timeline-lineNumbers" key="lineNumbers">{lineNumbers}</div>);

    this.props.loggedEvents.forEach((event, index) => {
      const rows = [];
      for (let i = 0; i < maxLine; i++) {
        let active = i === event.loc.start.line - 1;
        let focused = isMatchingLocation(event.loc, this.props.focusedLocation);
        rows.push(<div
          className={`timeline-row ${active && 'is-active'} ${focused && 'is-focused'}`}
          key={`step-${index}-row-${i}`}
          onMouseOver={this.sendHoverEvents.bind(this, index)}
        />);
      }

      output.push(<div className="timeline-column" key={`step-${index}`}>
        {rows}
      </div>);
    });

    return output;
  }
}

export default Timeline;
