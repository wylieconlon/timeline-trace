import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    const dots = this.makeDotTimeline();
    return (<div className="timeline">{dots}</div>);
  }

  makeDotTimeline() {
    const lines = this.props.loggedEvents.map((event) => {
      return { line: event.loc.start.line };
    });

    let maxLine = 0;
    lines.forEach(({ line }) => {
      if (line > maxLine) {
        maxLine = line;
      }
    });

    let outputStr = '';
    let column;
    let row;
    for (let i = 0; i < maxLine * lines.length; i++) {
      column = i % lines.length;
      row = Math.floor(i / lines.length);
      if (i > 0 && column === 0) {
        outputStr += '\n';
      }
      if (column === 0) {
        if (row < 9) {
          outputStr += ' ';
        }
        outputStr += (row + 1) + ' |';
      }
      if (lines[column].line - 1 === row) {
        outputStr += ' • |';
      } else {
        outputStr += '   |';
      }
    }

    return outputStr;
  }
}

export default Timeline;
