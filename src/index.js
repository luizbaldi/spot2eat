/*
 * Styles
 */
import 'css-reset/reset.css';
import './style/general.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);