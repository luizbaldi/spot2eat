import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div>
			<Link to="/dashboard">
				<button>Dashboard</button>
			</Link>
		</div>
	);
}

export default Login;