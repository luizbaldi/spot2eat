import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';

class App extends Component {
    render() {
        return (
            <Switch>
            	<Route exact path='/' component={ Login } />
            	<Route path='/dashboard' component={ Dashboard } />
            </Switch>
        );
    }
}

export default App;

