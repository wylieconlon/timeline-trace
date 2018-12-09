import React, { Component } from 'react';

import Variable from './Variable';
import getTextForEvent from './util/getTextForEvent';
import isMatchingLocation from './util/matchingLocation';
import getChangesOverTime from './util/getChangesOverTime';

class RunLog extends Component {
  render() {
    const changes = getChangesOverTime(this.props.loggedEvents);
    return (
      <div className="runlog" onMouseOut={this.handleMouseOut.bind(this)}>
        <div className="runlog-variables">
          {changes.map(({ name, values}) => {
            return <Variable name={name} values={values} key={name} />;
          })}
        </div>

        <div className='runlog-lines'>
          {this.props.loggedEvents.filter(({ type }) => {
            return type !== 'assignment' && type !== 'fncall';
          }).map((event, index) => {
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