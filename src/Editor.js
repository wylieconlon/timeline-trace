import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

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

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this._editor.setValue(this.props.code);
    }

    if (this.props.focusedLocation && this.props.focusedLocation !== prevProps.focusedLocation) {
      const loc = this.props.focusedLocation;
      const focusedStart = {
        line: loc.start.line - 1,
        ch: loc.start.column
      };
      const focusedEnd = {
        line: loc.end.line - 1,
        ch: loc.end.column
      };

      const previousMarker = this.state.marker;

      let createNewMarker = true;
      if (
        prevProps.focusedLocation &&
        this.props.focusedLocation !== prevProps.focusedLocation
      ) {
        this.state.marker.clear();
      } else {
        createNewMarker = false;
      }
      if (createNewMarker) {
        const marker = this._editor.markText(focusedStart, focusedEnd, {
          className: 'is-highlighted',
          clearOnEnter: true,
        });

        this.setState({ marker });
      }
    } else if (this.state.marker) {

      this.state.marker.clear();
      this.setState({ marker: null });
    }
  }
}

export default Editor;
