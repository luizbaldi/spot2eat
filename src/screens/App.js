import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from './login/LoginScreen';
import DashboardScreen from './dashboard/DashboardScreen';
import SignUpScreen from './signup/SignUpScreen';
import ManageSpotsScreen from './manageSpots/ManageSpotsScreen';

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

