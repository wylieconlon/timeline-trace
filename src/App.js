import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Exercise from './Exercise';
import ExerciseVariables from './exercises/ExerciseVariables';
import ExerciseVariableCounter from './exercises/ExerciseVariableCounter';
import ExerciseClickHandling from './exercises/ExerciseClickHandling';
import ExerciseTyping from './exercises/ExerciseTyping';
import ExerciseFib from './exercises/ExerciseFib';
import ExerciseFizzbuzz from './exercises/ExerciseFizzbuzz';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/exercise/variables" component={ExerciseVariables} />
          <Route path="/exercise/variablecounter" component={ExerciseVariableCounter} />
          <Route path="/exercise/clickhandling" component={ExerciseClickHandling} />
          <Route path="/exercise/typing" component={ExerciseTyping} />
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
