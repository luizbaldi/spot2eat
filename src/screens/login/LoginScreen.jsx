import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FullScreenContainer from '../../components/FullScreenContainer';
import Button from '../../components/Button';
import axios from 'axios';

/*
 * Component
 */
class LoginScreen extends Component {
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
					let currentUser = response.data.find(user => {
						return username === user.username && password === user.password;
					});
					if (currentUser) {
						alert(`Welcome ${currentUser.name} :)`);
						localStorage.setItem('user', JSON.stringify(currentUser));
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
			<FullScreenContainer {...this.props} style={styles.page}>
				<div style={styles.content}>
					<form style={styles.form}>
						<img style={styles.logo} alt="Spot2Eat" src="img/color-logo-764x223.png"/>
						<div style={styles.row}>
							<input style={styles.input}
								placeholder="Usuário"
								onChange={this.onFieldChange}
								name="username" />
						</div>

						<div style={styles.row}>
							<input type="password"
								style={styles.input}
								placeholder="Senha"
								onChange={this.onFieldChange}
								name="password" />
						</div>

						<div style={styles.row}>
							<Button 
								label="Login"
								onClick={this.validateLogin}
							/>
						</div>

						<div style={styles.row}>
							<Link style={styles.signUp} to="/signup"><span>Ou crie uma conta clicando aqui</span></Link>
						</div>
					</form>
				</div>
			</FullScreenContainer>
		);
	}
};

/*
 * Style
 */
const styles = {
	page: {
		background: 'url(img/blue-people-bg.jpg) no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		color: 'white'
	},

	content: {
		bottom: '10px',
		left: '25px',
		position: 'absolute',
		right: '25px',
	},

	logo: {
		marginBottom: '25px',
		width: '100%'
	},

	form: {
		margin: '0 auto',
		maxWidth: '450px',
		width: '100%'
	},

	row: {
		marginBottom: '7px',
		width: '100%'
	},

	input: {
		background: 'white',
		border: 'none',
		borderRadius: '22px',
		boxShadow: '0 2px 5px rgba(0, 0, 0, .5)',
		display: 'block',
		height: '44px',
		fontSize: '16px',
		padding: '0 22px',
		width: '100%'
	},

	signUp: {
		color: 'white',
		display: 'inline-block',
		lineHeight: '44px',
		textDecoration: 'none',
		textAlign: 'center',
		width: '100%'
	}
};

export default LoginScreen;