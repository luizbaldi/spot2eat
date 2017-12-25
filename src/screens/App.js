import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import SignUpScreen from './SignUpScreen';
import ManageSpotsScreen from './ManageSpotsScreen';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LoginScreen} />
        <Route path='/dashboard' component={DashboardScreen} />
        <Route path='/signup' component={SignUpScreen} />
        <Route path='/manageSpots' component={ManageSpotsScreen} />
      </Switch>
    );
  }
}

export default App;

