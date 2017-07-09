import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FullScreenContainer from '../../components/FullScreenContainer';
import Input from '../../components/Input';
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
					<Input type={Input.Types.TEXT}
						style={styles.input}
						placeholder="Username"
						onChange={this.onFieldChange}
						name="username" />
					<Input type={Input.Types.PASSWORD}
						style={styles.input}
						placeholder="Senha"
						onChange={this.onFieldChange}
						name="password" />
					<button onClick={this.validateLogin} type="button">Login</button>
					<Link to="/signup"><span>Ou crie uma conta clicando aqui</span></Link>
				</form>
			</FullScreenContainer>
		);
	}
};

const styles = {
	page: {
		background: 'url(img/blue-people-bg.jpg) no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		color: 'white'
	},

	form: {
		maxWidth: '450px',
		width: '100%'
	},

	input: {
		border: 'none',
		borderBottom: '1px solid grey',
		display: 'block',
		height: '44px',
		color: '#3c3c3c'
	},

	label: {
		display: 'block',
		marginBottom: '5px'
	}
};

export default LoginScreen;