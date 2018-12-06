import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Exercise1 from './exercises/Exercise1';
import Exercise2 from './exercises/Exercise2';
import Exercise3 from './exercises/Exercise3';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/exercise/1" component={Exercise1} />
          <Route path="/exercise/2" component={Exercise2} />
          <Route path="/exercise/3" component={Exercise3} />
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
