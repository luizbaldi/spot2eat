/*
 * Dependencies
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FullScreenContainer from '../../components/full-screen-container';
import axios from 'axios';

/*
 * Component
 */
export default class LoginScreen extends Component {
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
			<FullScreenContainer style={styles.page}>
				<h1>Spot2Eat</h1>
				<form style={styles.form}>
					<label htmlFor="username">E-mail:</label>
					<input style={styles.input} name="username" onChange={this.onFieldChange} />

					<label htmlFor="password">Senha:</label>
					<input style={styles.input} name="password" onChange={this.onFieldChange} />

					<button onClick={this.validateLogin} type="button">Login</button>
					<Link to="/signup">
						<span>Ou crie uma conta clicando aqui</span>
					</Link>
				</form>
			</FullScreenContainer>
		);
	}
}

const styles = {
	page: {
		background: 'url(img/blue-people-bg.jpg) no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	},

	form: {
		maxWidth: '450px',
		width: '100%'
	},

	input: {
		background: 'white',
		height: '44px',
		color: '#3c3c3c'
	},

	label: {
		display: 'block',
		
	}
};