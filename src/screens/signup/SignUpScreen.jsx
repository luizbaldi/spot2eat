import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import FullScreenContainer from '../../components/FullScreenContainer';

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
							id: data[data.length -1].id + 1,
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
				<div className="panel vertically-center text-center">
					<form>
						Nome:
						<br />
						<input type="text" name="name" onChange={this.onFieldChange} />
						<br />
						Username:
						<br />
						<input type="text" name="username" onChange={this.onFieldChange} />
						<br />
						Senha:
						<br />
						<input type="password" name="password" onChange={this.onFieldChange} />
						<br />
						<button onClick={this.signUp} type="button">Cadastrar</button>
					</form>
				</div>
			</FullScreenContainer>
		);
	}
};

export default SignUp;