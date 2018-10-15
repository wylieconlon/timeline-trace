import React, { Component } from 'react';

import Timeline from './Timeline';
import Editor from './Editor';
import Iframe from './Iframe-component';
import RunLog from './RunLog';

import visitor from './visitor';

import clickHandlingSample from './samples/clickhandling';
import variableAssignSample from './samples/variableAssign';
import nameGame from './samples/nameGame';
import fizzbuzz from './samples/fizzbuzz';

const samples = [
  fizzbuzz,
  clickHandlingSample,
  variableAssignSample,
  nameGame,
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: loopSample,
      selectedSampleIndex: 0,
      loggedEvents: [],
      isShowingSource: false,
      generatedCode: '',
      hoveredCodePosition: null,
    };
  }

  addToTimeline(type, name, loc, ...args) {
    const previousEvents = this.state.loggedEvents;
    this.setState({
      loggedEvents: previousEvents.concat({
        type,
        name,
        loc,
        args
      })
    });
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

    window.addEventListener('message', receiveMessage.bind(window), false);
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="buttons">
            <div className="resumed">
              <button className="showSource"
                onClick={this.toggleShowingSource.bind(this)}
              >
                Show generated code
              </button>
            </div>

            <select value={this.state.selectedSampleIndex}
              onChange={this.handleSampleChange.bind(this)}
            >
              {samples.map((sample, index) => {
                return <option value={index} key={`sample-${index}`}>Sample {index + 1}</option>;
              })}
            </select>

            <div className="shared">
              <button className="share">Generate Unique URL</button>
            </div>
          </div>

          <div className="editor-area">
            <div className="row">
              <Editor code={this.state.code}
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
                code={this.state.code}
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
        </div>
      </div>
    );
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

  handleSampleChange(ev) {
    const newSampleIndex = ev.target.value;
    const newCode = samples[newSampleIndex];

    this.setState({
      selectedSampleIndex: newSampleIndex
    });

    this.onCodeChange(newCode);
  }

  onCodeChange(newCode) {
    let generated = '';
    try {
      generated = visitor(newCode).code;
    } catch (e) {
      // Show an error to the user?
      console.error(e);
    }

    this.setState({
      code: newCode,
      generatedCode: generated,
      loggedEvents: [],
    });
  }
}

export default App;
