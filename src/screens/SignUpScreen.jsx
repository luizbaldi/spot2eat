import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';

/* Libs */
import axios from 'axios';
import swal from 'sweetalert2';
import { auth } from '../util/fire';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/UserActions';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
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
		let email = this.state.email;
		let password = this.state.password;
		if (name && email && password) {
			this.setLoadingState(true);
			auth.createUserWithEmailAndPassword(email, password).then(response => {
				this.setLoadingState(false);
				this.props.setUser({ name, email, password });
				this.props.history.push('/dashboard');
				swal(
					'Successo!',
					'Bem vindo ao barco :)',
					'success'
				);
			})
			.catch(err => {
				this.setLoadingState(false);
				swal(
					'Ops',
					err.message,
					'error'
				);
			});
		} else {
			swal(
				'',
				'Por favor, preencha todos os campos para prosseguir.',
				'info'
			);
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
								placeholder="E-mail"
								onChange={this.onFieldChange}
								name="email"
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