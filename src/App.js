import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchPage from './pages/Search'
import HomePage from './pages/Home'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
      </Switch>
    </Router>
  );
}

export default App;