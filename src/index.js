import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import { BrowserRouter } from 'react-router-dom';
import './shared/style/general.css';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);