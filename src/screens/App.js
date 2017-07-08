import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import SignUp from './signup/SignUp';


class App extends Component {
    render() {
        return (
            <Switch>
            	<Route exact path='/' component={Login} />
            	<Route path='/dashboard' component={Dashboard} />
            	<Route path='/signup' component={SignUp} />
            </Switch>
        );
    }
}

export default App;

