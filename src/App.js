import React from 'react'
import { LoginComponent } from './component/LoginComponet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const App = () => (
    <Router>
    <Switch>
      <Route exact path='/' component={LoginComponent} />
    </Switch>
  </Router>
)
