import React, { Component } from 'react';
import { Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

import getTextForEvent from './util/getTextForEvent';

class Timeline extends Component {
  render() {
    const data = this.getScatterPlotData(this.props.loggedEvents);

    return (
      <div className="timeline">
        <ResponsiveContainer>
          <ScatterChart>
            <XAxis dataKey="step" label={{ value: "Step", position: 'insideBottom' }} />
            <YAxis dataKey="line" label={{ value: "Line", angle: -90, position: 'center' }} reversed={true} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={this.getTooltip.bind(this)} />
            <Scatter data={data} fill="#8884d8">
              {
                data.map((entry, index) => {
                  return <Cell key={`cell-${index}`}
                    onMouseOver={this.sendHoverEvents.bind(this, index)}
                  />
                })
              }
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  getTooltip({ payload }) {
    if (payload.length === 0) {
      return <span></span>;
    } else {
      return <span className="timeline-tooltip">
        {getTextForEvent(payload[0].payload.event, payload[0].payload.step)}
       </span>;
    }
  }

  sendHoverEvents(index) {
    if (typeof index !== undefined) {
      this.props.onHover(index);
    }
  }

  getScatterPlotData(loggedEvents) {
    return loggedEvents.map((event, index) => {
      return {
        line: event.loc.start.line - 1,
        step: index + 1,
        event: event
      };
    });
  }
}

export default Timeline;
