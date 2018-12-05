import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Exercise1 from './exercises/Exercise1';
import Exercise2 from './exercises/Exercise2';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/exercise/1" component={Exercise1} />
          <Route path="/exercise/2" component={Exercise2} />
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
