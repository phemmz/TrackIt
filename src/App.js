import React from 'react';
// import { LoginComponent } from './component/LoginComponent';
import Dashboard from './component/Dashboard';
import { LandingPage } from './component/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const App = () => (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
);
