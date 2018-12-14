import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ExerciseLanguageBasics extends Component {
  render() {
    return <div>
      <h1>Javascript Basics</h1>

      <p>
        In Javascript, there are 6 primitive data types: string, number, boolean, null, undefined, symbol.
        There are more types that will be important to your understanding, especially: arrays, objects,
        functions, . For more information, see&nbsp;
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">
          JavaScript data types and data structures
        </a>&nbsp;
        on MDN
      </p>

      <h3>Booleans</h3>

      <p>Booleans represent the logical values true or false.</p>

      <pre data-lang="javascript"><code>{`true
false `}</code></pre>

      <h3>undefined</h3>

      <p>Any value that has not been defined has the keyword undefined, which represents its absence.</p>

      <pre data-lang="javascript"><code>undefined</code></pre>

      <h3>null</h3>

      <p>The value null represents the intentional absence of any object value.</p>

      <pre data-lang="javascript"><code>null</code></pre>

      <h3>Numbers</h3>

      <p>Numbers in Javascript include both integers and floating point numbers, such as:</p>

      <pre data-lang="javascript"><code>{`17
1.23456`}</code></pre>

      <h3>Strings</h3>

      <p>Strings represent text content, and are wrapped in single or double quotes:</p>

      <pre data-lang="javascript"><code>{`"hello world"
'I am learning Javascript'`}</code></pre>

      <h3>Symbol</h3>

      <p>Symbols will not be explored in depth in this project.</p>

      <h3><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">
        Arrays
      </a></h3>

      <p>Arrays are a list of values, which can be any type.</p>

      <pre data-lang="javascript"><code>['apple', 'banana']</code></pre>

      <p>To access an item in the array:</p>

      <pre data-lang="javascript"><code>['apple', 'banana'][0]</code></pre>

      <p>To get the length of an item in the array:</p>

      <pre data-lang="javascript"><code>['apple', 'banana'].length</code></pre>

      <h3><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">
        Object
      </a></h3>

      <p>
        Objects are one of the most important parts of Javascript. Literal objects are key value pairs:
      </p>

      <pre data-lang="javascript"><code>{`{
  id: 1,
  name: 'Wylie',
  traits: [{
    name: 'nice',
  }, {
    name: 'quiet'
  }]
}`}</code></pre>

      <p>Which can be accessed with dot notation or square brackets notation:</p>

      <pre data-lang="javascript"><code>{`myObject.length
myObject.id
myObject['name']`}</code></pre>

      <h3>Functions</h3>

      <p>Functions are first-order types in Javascript, and can be named or anonymous:</p>

      <pre data-lang="javascript"><code>{`function getLength(str) {
  return str.length;
}

getLength('hello'); // This has the value of 5

function callMyAnonymousFunction(fn) {
  fn();
}

callMyAnonymousFunction(function() {
  // This gets called
});
`}</code></pre>

      <Link to="/exercise/introduction/3">Learn how to modify the content of a webpage</Link>
    </div>;
  }
}

export default ExerciseLanguageBasics;