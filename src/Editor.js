import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import debounce from 'lodash-es/debounce';
import 'lsp-editor-adapter/lib/codemirror-lsp.css';
import { CodeMirrorAdapter, LspWsConnection } from 'lsp-editor-adapter';

import matchingLocation from './util/matchingLocation';
import getChangesOverTime from './util/getChangesOverTime';

import Variable from './Variable';

class Editor extends Component {
  constructor(props) {
    super(props);

    this._editor = null;
    this.editorContainer = React.createRef();

    this.connection = null;
    this.adapter = null;
    this.socket = null;

    this.state = {
      highlightMarker: null,
      bookmarks: [],
      tooltipStyle: {},
      variable: null,
    };
  }

  render() {
    return (
      <div className="editor-container">
        <div className="editor" ref={this.editorContainer}></div>
        <div className="editor-tooltip" style={this.state.tooltipStyle}>
          {this.state.variable ? <Variable {...this.state.variable} /> : ''}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._editor = CodeMirror(this.editorContainer.current, {
      mode: 'javascript',
      theme: 'monokai',
      value: this.props.code || '',
      lineNumbers: true,
      gutters: ['CodeMirror-lsp'],
    });

    let url = 'ws://159.65.36.45:8080/javascript';
    this.socket = new WebSocket(url);
    this.connection = new LspWsConnection({
      serverUri: url,
      languageId: 'javascript',
      rootUri: 'file:///usr/src/app/sources/',
      documentUri: 'file:///usr/src/app/sources/file.js',
      documentText: () => this._editor.getValue(),
    }).connect(this.socket);

    this.adapter = new CodeMirrorAdapter(this.connection, {}, this._editor);

    this.props.onCodeChange(this._editor.getValue());

    this._editor.on('change', this._updateBookmarks.bind(this));

    this._editor.on('change', debounce(() => {
      this.props.onCodeChange(this._editor.getValue());
    }, 500));

    this.editorContainer.current.addEventListener('mouseover', this._handleMouseOver.bind(this));
  }

  componentWillUnmount() {
    this._editor.off('change');
    this.socket.close();
  }

  _createMarker(range, options) {
    const start = {
      line: range.start.line - 1,
      ch: range.start.column
    };
    const end = {
      line: range.end.line - 1,
      ch: range.end.column
    };

    const marker = this._editor.markText(start, end, options);

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

      const prevStateMarker = this.state.highlightMarker;
      if (
        !prevProps.focusedLocation ||
        !matchingLocation(newLocation, prevProps.focusedLocation)
      ) {
        if (prevStateMarker && prevStateMarker.find()) {
          prevStateMarker.clear();
        }
        const marker = this._createMarker(newLocation, {
          className: 'is-highlighted'
        });
        this.setState({
          highlightMarker: marker
        });
      }
    }

    if (prevProps.focusedLocation && !this.props.focusedLocation) {
      if (this.state.marker && this.state.marker.find()) {
        this.state.marker.clear();
        this.setState({ marker: null });
      }
    }
  }

  _getChanges() {
    return getChangesOverTime(this.props.loggedEvents);
  }

  _updateBookmarks() {
    const changesOverTime = this._getChanges();

    if (this.state.bookmarks.length) {
      this.state.bookmarks.forEach((bookmark) => bookmark.clear());
    }

    let bookmarks = [];

    changesOverTime.forEach(({ name, type, values }) => {
      const originalLoc = values[0].loc;
      const lastValue = values[values.length - 1];

      bookmarks.push(this._createMarker(originalLoc, {
        className: 'tracked',
        attributes: {
          'data-eventName': name
        }
      }));

      const widget = document.createElement('span');
      widget.className = 'bookmark';

      if (type === 'fncall') {
        widget.innerText = `Called ${values.length} times`;
      } else {
        widget.innerText = lastValue.value;
      }

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

  _handleMouseOver(ev) {
    if (ev.target.className.includes('tracked')) {
      const name = ev.target.getAttribute('data-eventName');
      if (!this.state.variable || (this.state.variable && this.state.variable.name !== name)) {
        const changes = this._getChanges();
        const match = changes.find((change) => change.name === name);
        if (match) {
          this.setState({
            variable: match,
            tooltipStyle: {
              display: 'block',
              left: ev.pageX,
              top: ev.pageY + this._editor.defaultTextHeight(),
            }
          });
        }
      }
    } else if (this.state.variable) {
      this.setState({
        variable: null,
        tooltipStyle: {}
      });
    }
  }
}

export default Editor;
