import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.validateLogin = this.validateLogin.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
	}
	validateLogin() {
		let email = this.state.email;
		let password = this.state.password;
		if (email && password) {
	  		axios.get("https://api.myjson.com/bins/8e5l3")
				.then(response => {
					let currentUser;
					let isLoginValid = response.data.some(user => {
						if (email === user.email && password === user.password) {
							currentUser = user;
							return true;
						}
					})
					if (isLoginValid) {
						alert(`Welcome ${currentUser.name} :)`);
						this.props.history.push('/dashboard');
					} else {
						alert("Invalid login.");
					}
				})
				.catch(err => {
					alert("Error during loggin in :(");
				});
		} else {
			alert("Please type your e-mail and password to procced :)");
		}
	}
	onEmailChange(e) {
		this.setState({
			email: e.target.value
		});
	}
	onPasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}
	render() {
		return (
			<div className="app-container bg-color-default">
				<div className="panel vertically-center text-center">
					<h4>spot2eat</h4>
					<form>
						E-mail:
						<br />
						<input type="text" name="email" onChange={this.onEmailChange} />
						<br />
						Senha:
						<br />
						<input type="password" name="password" onChange={this.onPasswordChange} />
						<br />
						<button onClick={this.validateLogin} type="button">Login</button>
						<hr />
						<Link to="/signup">
							<button type="button">Cadastre-se</button>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;