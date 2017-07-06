import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


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
			<div className="login-container text-center bg-color-default">
				<div className="panel vertically-center">
					<form className="container">
						<FormGroup>
							<ControlLabel className="label-color-default">E-mail</ControlLabel>
							<FormControl id="email"
								type="text"
							/>
							<ControlLabel className="label-color-default">Senha</ControlLabel>
							<FormControl id="password"
								type="text"
							/>
					    </FormGroup>
						<Button block onClick={this.validateLogin}>Login</Button>
						<hr />
						<Link to="/signup">
							<Button block>Cadastre-se</Button>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;