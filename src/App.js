import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import links from './links';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {links.map((link) => {
            return <Route path={link.url} component={link.component} key={link.url} exact />;
          })}
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
