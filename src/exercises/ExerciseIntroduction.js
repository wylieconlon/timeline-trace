import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ExerciseIntroduction extends Component {
  render() {
    return <div>
      <h1>Introduction: What can you do with Javascript?</h1>

      <p>
        Javascript is the language of the web, and while it can be used for many
        other purposes, this project focuses on building an intuitive and visual
        understand of how to write code for the web. In its current state, this
        is best used in a teaching setting.
      </p>

      <h2>What can you do with Javascript in web browser?</h2>

      <ul>
        <li>Display information to the user with HTML</li>
        <li>Get user input from sources like the mouse or keyboard</li>
        <li>Load data dynamically</li>
        <li>Change how a webpage looks with CSS</li>
      </ul>

      <Link to="/exercise/introduction/2">Next page</Link>
    </div>;
  }
}

export default ExerciseIntroduction;