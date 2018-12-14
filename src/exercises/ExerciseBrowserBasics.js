import React, { Component } from 'react';

import Exercise from '../Exercise';

const html = `<h1>Hello World!</h1>`;
const javascript = ``;

class ExerciseBrowserBasics extends Component {
  render() {
    return <Exercise javascript={javascript} html={html}>
      <h1>Displaying Information on a Webpage</h1>

      <p>
        In this editing environment, you will write Javascript code on the left, which will run
        inside a web page on the right.
      </p>

      <p>
        When a browser displays a web page, it is called a document. You can modify the document
        with code, using the &nbsp;
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction">
          Document Object Model
        </a>.
      </p>

      <p>
        Some of the most common methods you will use while working with the DOM are:
      </p>

      <pre data-lang="javascript"><code>{`
// 1. Select an element
var body = document.body;
var myElement = document.querySelector('h1');

// 2. Create an element
var element = document.createElement('div');
element.innerText = 'plain text';
body.appendChild(element);

myElement.innerHTML = 'some html';
element.addEventListener('click', function(ev) {
  console.log(ev);
});`}</code></pre>

      <p>
        In this example, there is an {`<h1>`} tag on the page which says Hello World. To change the
        text of the tag, you need to select it, and modify the Element.
      </p>

      <pre data-lang="javascript"><code>{`var el = document.querySelector('h1');
el.innerText = 'Javascript is cool!';`}</code></pre>

    </Exercise>;
  }
}

export default ExerciseBrowserBasics;