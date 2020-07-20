import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchPage from './pages/Search'
import HomePage from './pages/Home'

import styled from 'styled-components'

const Styles = styled.div`{
  .root{
    position: absolute; top: 0; bottom: 0;
    height: 100%; width: 100%;
    background-color: #659dbd;
    overflow: scroll;
  }
}
`

const App = () => {
  return (
    <Router>
      <Styles>
       <div className="root">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </div>
      </Styles>
    </Router>
  );
}

export default App;