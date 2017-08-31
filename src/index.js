import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import { BrowserRouter } from 'react-router-dom';

/*
* Styles
*/
import 'css-reset/reset.css';
import './style/general.css';
import 'sweetalert/dist/sweetalert.css';


ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);