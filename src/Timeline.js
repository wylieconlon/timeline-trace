import React, { Component } from 'react';

import isMatchingLocation from './matchingLocation';

const TIMELINE_COLUMN = 20;
const TIMELINE_ROW = 15;

class Timeline extends Component {
  render() {
    const dots = this.makeDotTimeline(
      this.props.code,
      this.props.loggedEvents,
      this.props.focusedLocation
    );

    const maxLine = this.props.code.split('\n').length;

    return <div className="timeline"
      onMouseOut={this.props.onHoverEnd.bind(this)}
    >
      <div className="timeline-scrollContainer" style={{
        width: this.props.loggedEvents.length * TIMELINE_COLUMN + 'px',
        height: maxLine * TIMELINE_ROW + 'px',
      }}>
        {dots}
      </div>
    </div>;
  }

  sendHoverEvents(index) {
    if (typeof index !== undefined) {
      this.props.onHover(index);
    }
  }

  makeDotTimeline(code, loggedEvents, focusedLocation) {
    let maxLine = code.split('\n').length;

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

    const eventIndex = [];
    for (let i = 1; i <= loggedEvents.length; i++) {
      let shouldAddIndex = true;
      if (i >= 10) {
        shouldAddIndex = i % 2 === 0;
      }
      if (i >= 100) {
        shouldAddIndex = i % 5 === 0;
      }

      if (shouldAddIndex) {
        eventIndex.push(<div className="timeline-eventNumber"
          key={`event-${i}`}
          style={{
            left: i * TIMELINE_COLUMN + 'px',
          }}
        >
          {i}
        </div>);
      }
    }
    output.push(<div className="timeline-eventNumbers" key="eventNumbers">{eventIndex}</div>);

    loggedEvents.forEach((event, index) => {
      let focused = isMatchingLocation(event.loc, focusedLocation);
      output.push(<div
        className={`timeline-event ${focused && 'is-focused'}`}
        key={index}
        style={{
          top: (event.loc.start.line - 1) * TIMELINE_ROW + 'px',
          left: (index + 1) * TIMELINE_COLUMN + 'px',
        }}
        onMouseOver={this.sendHoverEvents.bind(this, index)}
      ></div>);
    });

    return output;
  }
}

export default Timeline;
