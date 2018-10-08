import codemirror from 'codemirror';
const visitor = require('./visitor');

import 'codemirror/mode/javascript/javascript.js';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('./style.css');

const CodeMirror = require('codemirror');

let timeline = [];

function addToTimeline(type, name, loc, ...args) {
  let variablesEl = document.querySelector('.actual-variables');
  let outputEl = document.createElement('div');

  outputEl.classList.add('step-line');
  outputEl.setAttribute('data-lines', JSON.stringify(loc));

  timeline.push({
    line: loc.start.line
  });

  if (type === 'assignment') {
    outputEl.innerText = `Step ${timeline.length}: Assign ${name} to "${args[0]}" on line ${loc.start.line}`;
  } else if (type === 'fncall') {
    outputEl.innerText = `Step ${timeline.length}: Call ${name} on line ${loc.start.line} with arguments: ${args.join(', ')}`;
  } else if (type === 'block') {
    outputEl.innerText = `Step ${timeline.length}: Run branch on line ${loc.start.line}`;
  } else if (type === 'condition') {
    outputEl.innerText = `Step ${timeline.length}: Condition ${name} on line ${loc.start.line} had result: ${args[0]}`;
  } else {
    outputEl.innerText = `Step ${timeline.length}`;
  }

  variablesEl.appendChild(outputEl);

  renderTimeline();
}

function renderTimeline() {
  const timelineEl = document.querySelector('.timeline');
  timelineEl.innerHTML = '';

  const lines = [];
  let maxLine = 0;
  timeline.forEach(({ line }) => {
    if (line > maxLine) {
      maxLine = line;
    }
  });

  let outputStr = '';
  let column;
  let row;
  for (let i = 0; i < maxLine * timeline.length; i++) {
    column = i % timeline.length;
    row = Math.floor(i / timeline.length);
    if (i > 0 && column === 0) {
      outputStr += '\n';
    }
    if (column === 0) {
      if (row < 9) {
        outputStr += ' ';
      }
      outputStr += (row + 1) + ' |';
    }
    if (timeline[column].line - 1 === row) {
      outputStr += ' • |';
    } else {
      outputStr += '   |';
    }
  }
  timelineEl.appendChild(document.createTextNode(outputStr));
}

let iframe;

function _generateIframeHtml(code) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <script src="/dist/iframe.js"></script>
    </head>
    <body>
      <script>${code}</script>
    </body>
  </html>
  `;
}

function initDebugger(node, code) {
  var code = code || node.textContent;

  let container = document.body;

  setTimeout(() => finishInit(code, container), 10);

  return container;
}

function finishInit(code, container) {
  const pausedBtns = container.querySelector('.paused');
  const resumedBtns = container.querySelector('.resumed');
  const outputEl = container.querySelector('.actual-output');
  const variablesEl = container.querySelector('.actual-variables');
  const generatedEl = container.querySelector('.generated');

  const mirror = CodeMirror(container.querySelector('.editor'), {
    mode: 'javascript',
    theme: 'monokai',
    value: code,
    lineNumbers: true,
  });


  function renderOutput() {
    let code = mirror.getValue();

    outputEl.innerHTML = '';

    const visited = visitor(code);

    generatedEl.innerHTML = '<code><pre>' + visited.code + '</pre></code>';
    document.querySelector('.actual-variables').innerHTML = '';

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    }
    outputEl.appendChild(iframe);

    iframe.srcdoc = _generateIframeHtml(visited.code);

    timeline = [];
    document.querySelector('.timeline').innerHTML = '';
  }

  renderOutput();
  mirror.on('change', renderOutput);

  container.querySelector('.showSource').addEventListener('click', function() {
    const generated = document.querySelector('.generated');
    if (generated.classList.contains('is-visible')) {
      generated.classList.remove('is-visible');
    } else {
      generated.classList.add('is-visible');
    }
  });

  let marker = null;
  variablesEl.addEventListener('mouseover', function(ev) {
    if (marker) {
      marker.clear();
      marker = null;
    }

    if (ev.target.classList.contains('step-line')) {
      const loc = JSON.parse(ev.target.getAttribute('data-lines'));
      marker = mirror.markText({
        line: loc.start.line - 1,
        ch: loc.start.column,
      }, {
        line: loc.end.line - 1,
        ch: loc.end.column,
      }, {
        className: 'is-highlighted',
        clearOnEnter: true,
      });
    }
  });
  variablesEl.addEventListener('mouseout', function(ev) {
    if (marker) {
      marker.clear();
      marker = null;
    }
  });
}

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

var demoDebugger = document.querySelector('.demo-debugger');
if(demoDebugger) {
  var codeMatch = window.location.href.match(/\?code=(.*)/);
  var code = codeMatch ? codeMatch[1] : '';
  var container = initDebugger(demoDebugger, atob(code));

  var shareBtn = container.querySelector('.share');
  console.log(shareBtn);
  shareBtn.addEventListener('click', function() {
    var mirror = document.querySelector('.CodeMirror').CodeMirror;
    var loc = window.location.href.replace(/\?code.*/, '');
    history.pushState(null, null, loc + '?code=' + btoa(mirror.getValue()));
  });
}
