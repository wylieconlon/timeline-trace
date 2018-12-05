import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return <div>
      <p>Table of Contents</p>

      <div>
        <h3>Variables</h3>
        <ul>
          <li><Link to="/exercise/1">What is a variable?</Link></li>
        </ul>

        <h3>User Interaction</h3>
        <ul>
          <li><Link to="/exercise/2">Click handling</Link></li>
        </ul>
      </div>
    </div>;
  }
}

export default Home;