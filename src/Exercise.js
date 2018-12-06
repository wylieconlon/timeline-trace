import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Timeline from './Timeline';
import Editor from './Editor';
import Iframe from './Iframe';
import RunLog from './RunLog';

import visitor from './core/visitor';

class Exercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedEvents: [],
      isShowingSource: false,
      generatedCode: '',
      hoveredCodePosition: null,
    };
  }

  render() {
    return (<div>
      <Link to="/">Home</Link>

      {this.props.children}

      <div className="editor-area">
        <div className="row">
          <Editor code={this.props.code}
            onCodeChange={this.onCodeChange.bind(this)}
            focusedLocation={this.state.hoveredCodePosition}
            onHover={this.handleHoverAtIndex.bind(this)}
            onHoverEnd={this.handleHoverEnd.bind(this)}
            loggedEvents={this.state.loggedEvents}
          />
          <Timeline loggedEvents={this.state.loggedEvents}
            focusedLocation={this.state.hoveredCodePosition}
            onHover={this.handleHoverAtIndex.bind(this)}
            onHoverEnd={this.handleHoverEnd.bind(this)}
            code={this.props.code}
          />
          <div className="output">
            <h4>Output:</h4>
            <Iframe className="iframe" code={this.state.generatedCode} />
          </div>
          <div className="variables">
            <h4>Program run log:</h4>
            <RunLog loggedEvents={this.state.loggedEvents}
              focusedLocation={this.state.hoveredCodePosition}
              onHover={this.handleHoverAtIndex.bind(this)}
              onHoverEnd={this.handleHoverEnd.bind(this)}
            />
          </div>
        </div>
      </div>

      {this.state.isShowingSource &&
        <div className="generated">
          {this.state.generatedCode}
        </div>
      }
    </div>);
  }

  componentDidMount() {
    const addToTimeline = this.addToTimeline.bind(this);

    function receiveMessage(event) {
      if (event.origin !== location.origin || event.source !== window.frames[0]) {
        return;
      }

      if (event.data.type === 'tracking') {
        const {
          type,
          name,
          loc,
          args
        } = event.data.trackingBody;

        addToTimeline(type, name, loc, ...args);
      }
    }

    this.iframeListener = window.addEventListener('message', receiveMessage.bind(window), false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.iframeListener);
  }

  addToTimeline(type, name, loc, ...args) {
    this.setState((state) => {
      return {
        loggedEvents: state.loggedEvents.concat({
          type,
          name,
          loc,
          args
        })
      };
    });
  }

  toggleShowingSource() {
    this.setState({
      isShowingSource: !this.state.isShowingSource
    });
  }

  handleHoverEnd() {
    this.setState({
      hoveredCodePosition: null
    });
  }

  handleHoverAtIndex(index) {
    const event = this.state.loggedEvents[index];
    const loc = event.loc;
    this.setState({
      hoveredCodePosition: {
        start: Object.assign({}, loc.start),
        end: Object.assign({}, loc.end),
      }
    });
  }

  onCodeChange(newCode) {
    let generated = '';
    try {
      generated = visitor(newCode).code;
    } catch (e) {
      // Show an error to the user?
      console.error(e);
    }

    if (this.state.generatedCode !== generated) {
      this.setState({
        code: newCode,
        generatedCode: generated,
        loggedEvents: [],
      });
    }
  }
}

export default Exercise;
