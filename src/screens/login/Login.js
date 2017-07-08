import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.validateLogin = this.validateLogin.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	validateLogin() {
		let username = this.state.username;
		let password = this.state.password;
		if (username && password) {
	  		axios.get("https://api.myjson.com/bins/1gzisn")
				.then(response => {
					let currentUser;
					let isLoginValid = response.data.some(user => {
						if (username === user.username && password === user.password) {
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

	onFieldChange({target}) {
		this.setState({
			[target.name]: target.value
		});
	}
	
	render() {
		return (
			<div className="app-container screen-login">
				<div className="panel vertically-center text-center">
					<h4>spot2eat</h4>
					<form>
						Username:
						<br />
						<input type="text" name="username" onChange={this.onFieldChange} />
						<br />
						Senha:
						<br />
						<input type="password" name="password" onChange={this.onFieldChange} />
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