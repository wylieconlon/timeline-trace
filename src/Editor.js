import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import debounce from 'lodash-es/debounce';

import matchingLocation from './matchingLocation';
import getChangesOverTime from './getChangesOverTime';

class Editor extends Component {
  constructor(props) {
    super(props);

    this._editor = null;
    this.editorContainer = React.createRef();

    this.state = {
      marker: null,
      bookmarks: [],
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

    this._editor.on('change', debounce(() => {
      this.props.onCodeChange(this._editor.getValue());
    }), 500);
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

    const marker = this._editor.markText(focusedStart, focusedEnd, {
      className: 'is-highlighted',
      clearOnEnter: true,
    });

    return marker;
  }

  componentDidUpdate(prevProps) {
    // Order matters for this one
    if (
      this.props.code !== prevProps.code &&
      this._editor.getValue() !== this.props.code
    ) {
      // Only update the editor if it's a change from an external source
      // i.e. switching example
      this._editor.setValue(this.props.code);
    } else if (this.props.code !== prevProps.code) {
      this.state.bookmarks.forEach((bookmark) => {
        bookmark.clear();
      });
    }

    if (this.props.loggedEvents !== prevProps.loggedEvents) {
      this._updateBookmarks();
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


  _updateBookmarks() {
    const changesOverTime = getChangesOverTime(this.props.loggedEvents);

    if (this.state.bookmarks.length) {
      this.state.bookmarks.forEach((bookmark) => bookmark.clear());
    }

    let bookmarks = [];
    changesOverTime.forEach(({ values }) => {
      const originalLoc = values[0].loc;
      const lastValue = values[values.length - 1];

      const widget = document.createElement('span');
      widget.className = 'bookmark';
      widget.innerText = lastValue.value;

      bookmarks.push(this._editor.setBookmark({
        line: originalLoc.end.line - 1,
        ch: originalLoc.end.column
      }, {
        widget,
        insertLeft: true
      }));
    });

    this.setState({ bookmarks });
  }
}

export default Editor;
