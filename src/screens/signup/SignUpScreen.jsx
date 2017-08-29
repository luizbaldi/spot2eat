import React, { Component } from 'react';
import axios from 'axios';
import FullScreenContainer from '../../components/FullScreenContainer';
import Button from '../../components/Button';

/*
 * Component
 */
class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'name': '',
			'username': '',
			'password': ''
		};

		this.onFieldChange = this.onFieldChange.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	onFieldChange({target}) {
		this.setState({
			[target.name]: target.value
		});
	}

	signUp() {
		let name = this.state.name;
		let username = this.state.username;
		let password = this.state.password;
		if (name && username && password) {
			axios.get("https://api.myjson.com/bins/1gzisn")
				.then(({data}) => {
					let isUsernameAvaible = !data.some(user => {
						return username === user.username;
					});
					if (isUsernameAvaible) {
						let newUser = {
							id: data[data.length - 1].id + 1,
							name: name,
							username: username,
							password: password
						};
						data.push(newUser);
						axios.put("https://api.myjson.com/bins/1gzisn", data)
							.then(response => {
								alert("Success! Welcome to the boat :)");
								this.props.history.push('/dashboard');
							})
							.catch(err => {
								alert("Error during the creation of new user. Please try again.");
							});
					} else {
						alert("Username already taken, try another one.");
					}
				})
				.catch(err => {
					alert("Oops, something wrong happened :(");
				});
		} else {
			alert("Please, complete all fields to procced.")
		}
	}

	render() {
		return (
			<FullScreenContainer {...this.props} showFooter>
				<div style={styles.content}>
					<form style={styles.form}>
						<div style={styles.row}>
							<input style={styles.input}
								placeholder="Nome"
								onChange={this.onFieldChange}
								name="name"
							/>
						</div>
						<div style={styles.row}>
							<input style={styles.input}
								placeholder="Username"
								onChange={this.onFieldChange}
								name="username"
							/>
						</div>
						<div style={styles.row}>
							<input style={styles.input}
								placeholder="Senha"
								onChange={this.onFieldChange}
								name="password"
							/>
						</div>
						<div style={styles.row}>
							<Button 
								label="Cadastrar"
								onClick={this.signUp}
							/>
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

	content: {
		bottom: '50px',
		left: '25px',
		position: 'absolute',
		right: '25px',
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
	}
};

export default SignUp;