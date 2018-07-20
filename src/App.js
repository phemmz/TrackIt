import React from 'react'
import { LandingPage } from './component/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const App = () => (
    <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
    </Switch>
  </Router>
)
