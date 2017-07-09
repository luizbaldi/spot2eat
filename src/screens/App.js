import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from './login/LoginScreen';
import DashboardScreen from './dashboard/DashboardScreen';
import SignUpScreen from './signup/SignUpScreen';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={LoginScreen} />
				<Route path='/dashboard' component={DashboardScreen} />
				<Route path='/signup' component={SignUpScreen} />
			</Switch>
		);
	}
}

export default App;

