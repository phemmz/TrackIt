import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './component/Dashboard';
import LandingPage from './component/LandingPage';
import ShipmentList from './component/ShipmentList';
import ShipmentDetails from './component/ShipmentDetails';
import Analytics from './component/Analytics';
import Update from './component/Update';

export const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/shipments' component={ShipmentList} />
      <Route exact path='/shipments/:shipmentId' component={ShipmentDetails} />
      <Route exact path='/analytics' component={Analytics} />
      <Route exact path='/update' component={Update} />
    </Switch>
  </Router>
);
