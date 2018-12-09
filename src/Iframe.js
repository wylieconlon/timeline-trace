import React, { Component } from 'react';

class Iframe extends Component {
  render() {
    const code = this.combineCode();
    return (
      <iframe srcDoc={code}
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    );
  }

  combineCode() {
    return `<!DOCTYPE html>
    <html>
      <head>
        <script src="/dist/runtime.js"></script>
      </head>
      <body>
        ${this.props.html || ''}

        <script>${this.props.javascript}</script>
      </body>
    </html>
    `;
  }
}

export default Iframe;
