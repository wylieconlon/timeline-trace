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
        <script src="/dist/iframe.js"></script>
      </head>
      <body>
        <script>${this.props.code}</script>
      </body>
    </html>
    `;
  }
}

export default Iframe;
