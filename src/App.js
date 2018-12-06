import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Exercise from './exercise';
import Exercise1 from './exercises/Exercise1';
import Exercise2 from './exercises/Exercise2';
import Exercise3 from './exercises/Exercise3';
import ExerciseFib from './exercises/ExerciseFib';
import ExerciseFizzbuzz from './exercises/ExerciseFizzbuzz';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/exercise/1" component={Exercise1} />
          <Route path="/exercise/2" component={Exercise2} />
          <Route path="/exercise/3" component={Exercise3} />
          <Route path="/exercise/fib" component={ExerciseFib} />
          <Route path="/exercise/fizzbuzz" component={ExerciseFizzbuzz} />
          <Route path="/playground" component={Exercise} />
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
