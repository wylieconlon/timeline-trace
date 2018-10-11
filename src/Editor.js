import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import matchingLocation from './matchingLocation';

class Editor extends Component {
  constructor(props) {
    super(props);

    this._editor = null;
    this.editorContainer = React.createRef();

    this.state = {
      marker: null
    };
  }

  render() {
    return (<div className="editor" ref={this.editorContainer}></div>);
  }

  componentDidMount() {
    this._editor = CodeMirror(this.editorContainer.current, {
      mode: 'javascript',
      theme: 'monokai',
      value: this.props.code,
      lineNumbers: true,
    });

    this.props.onCodeChange(this._editor.getValue());

    this._editor.on('change', () => {
      this.props.onCodeChange(this._editor.getValue());
    });
  }

  _createMarker(loc) {
    const focusedStart = {
      line: loc.start.line - 1,
      ch: loc.start.column
    };
    const focusedEnd = {
      line: loc.end.line - 1,
      ch: loc.end.column
    };
    console.log('creating marker on line', loc.start.line);

    const marker = this._editor.markText(focusedStart, focusedEnd, {
      className: 'is-highlighted',
      clearOnEnter: true,
    });

    return marker;
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this._editor.setValue(this.props.code);
    }

    if (this.props.focusedLocation) {
      const newLocation = this.props.focusedLocation;

      const prevStateMarker = this.state.marker;
      if (
        !prevProps.focusedLocation ||
        !matchingLocation(newLocation, prevProps.focusedLocation)
      ) {
        if (prevStateMarker && prevStateMarker.find()) {
          prevStateMarker.clear();
        }
        const marker = this._createMarker(newLocation);
        this.setState({ marker });
      }
    }

    if (prevProps.focusedLocation && !this.props.focusedLocation) {
      if (this.state.marker && this.state.marker.find()) {
        this.state.marker.clear();
        this.setState({ marker: null });
      }
    }
  }
}

export default Editor;
