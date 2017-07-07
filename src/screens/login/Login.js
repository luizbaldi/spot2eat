import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {
	constructor(props) {
		super(props);

		this.validateLogin = this.validateLogin.bind(this);
	}
	validateLogin() {
		// Add login validation later on
		let isLoginValid = true;

		if (isLoginValid) {
			this.props.history.push('/dashboard');
		} else {
			console.log("Login not valid.");
		}
	}
	render() {
		return (
			<div className="app-container bg-color-default">
				<div className="panel vertically-center">
					<h4>spot2eat</h4>
					<form>
						E-mail:
						<br />
						<input type="text" name="email" />
						<br />
						Senha:
						<br />
						<input type="text" name="password" />
						<br />
						<button onClick={this.validateLogin}>Login</button>
						<hr />
						<Link to="/signup">
							<button>Cadastre-se</button>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;