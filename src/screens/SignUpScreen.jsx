import React, { Component } from 'react';
import axios from 'axios';
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions';

/* Component */
class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'name': '',
			'username': '',
			'password': '',
			isLoading: false
		};

		this.onFieldChange = this.onFieldChange.bind(this);
		this.signUp = this.signUp.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
	}
	setLoadingState(loadingState) {
		this.setState({
			isLoading: loadingState
		});
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
			this.setLoadingState(true);
			axios.get("https://api.myjson.com/bins/1gzisn")
				.then(({data}) => {
					this.setLoadingState(false);
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
								this.props.setUser(newUser);
								this.props.history.push('/dashboard');
								swal("Successo! Bem vindo ao barco :)");
							})
							.catch(err => {
								swal("Error durante ao realizar cadastro. Tente novamente mais tarde.");
								console.log(err);
							});
					} else {
						swal("O usuário escolhido já está em uso, tente outro.");
					}
				})
				.catch(err => {
					this.setLoadingState(false);
					swal("Oops, algo de errado aconteceu. Tente novamente mais tarde");
					console.log(err);
				});
		} else {
			swal("Por favor, preencha todos os campos para prosseguir.")
		}
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showFooter loadingState={this.state.isLoading}>
				<div style={styles.content}>
					<span style={styles.title}>Cadastre-se abaixo :)</span>
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
		textAlign: 'center'
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

	title: {
		display: 'block',
		marginBottom: '32px',
		fontSize: '1.4em'
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);