import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { injectGlobal } from 'styled-components';

/* Styles */
import 'css-reset/reset.css';
import 'sweetalert2/dist/sweetalert2.min.css';

/* Global style */
injectGlobal([`
  * {
  	box-sizing: border-box;
  }

  body {
    position: static; /* Overrides css-reset library */
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
  }
`]);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
