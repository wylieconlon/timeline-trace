import React, { Component } from 'react';

import Timeline from './timeline';
import Editor from './editor';
import Iframe from './Iframe-component';
import RunLog from './RunLog';

import visitor from './visitor';

const codeSample = `
var total = 0;

for (var i=0; i<10; i++) {
  if(i == 5) {
    break;
  }
  total += i;
}
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: codeSample,
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
            <div className="shared">
              <button className="share">Generate Unique URL</button>
            </div>
          </div>

          <div className="editor-area">
            <div className="row">
              <Editor code={this.state.code}
                focusedLocation={this.state.hoveredCodePosition}
                onCodeChange={this.onCodeChange.bind(this)}
                onHover={this.handleHoverAtIndex.bind(this)}
                onHoverEnd={this.handleHoverEnd.bind(this)}
              />
              <Timeline loggedEvents={this.state.loggedEvents}
                focusedLocation={this.state.hoveredCodePosition}
                onHover={this.handleHoverAtIndex.bind(this)}
                onHoverEnd={this.handleHoverEnd.bind(this)}
              />
              <div className="output">
                <h4>Output:</h4>
                <div className="actual-output"></div>
                <Iframe code={this.state.generatedCode} />
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

  onCodeChange(newCode) {
    const generated = visitor(newCode).code;

    this.setState({
      code: newCode,
      generatedCode: generated,
      loggedEvents: [],
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
}

export default App;
