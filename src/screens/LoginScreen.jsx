import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';

/* Libs */
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { auth } from '../util/fire';
import project from '../../package.json';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/UserActions';
import { loadSpots } from '../actions/SpotsActions';

class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			isLoading: false
		};

		this.validateLogin = this.validateLogin.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
	}
	setLoadingState(loadingState) {
		this.setState({
			isLoading: loadingState
		});
	}
	validateLogin() {
		let email = this.state.email;
		let password = this.state.password;
		if (email && password) {
			this.setLoadingState(true);
			auth.signInWithEmailAndPassword(email, password).then(response => {
				this.props.setUser({ email, password, id: response.uid });
				this.setLoadingState(false);
				swal(
					'',
					`Bem vindo :)`,
					'success'
				);
				this.props.loadSpots({ email, password });
				this.props.history.push('/dashboard');
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
				'Ops...',
				'Por favor digite seu e-mail e senha para prosseguir :)',
				'info'
			);
		}
	}
	onFieldChange({target}) {
		this.setState({
			[target.name]: target.value
		});
	}
	testLogin() {
		const loginData = { id: "PUH15JX3NMOiV7FyD6t2wwtknPl2", email: "admin", password: "123"};
		swal(
			'',
			`Bem vindo :)`,
			'success'
		);
		this.props.setUser(loginData);
		this.props.loadSpots(loginData);
		this.props.history.push('/dashboard');
	}
	render() {
		return (
			<FullScreenContainer {...this.props} style={styles.page} loadingState={this.state.isLoading}>
				<div style={styles.content}>
					<form style={styles.form}>
						<img style={styles.logo} alt="Spot2Eat" src="img/color-logo-764x223.png"/>
						<span style={styles.version}>v{project.version}</span>
						<div style={styles.row}>
							<input style={styles.input}
								placeholder="Usuário"
								onChange={this.onFieldChange}
								name="email" />
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
								style={styles.button}
							/>
						</div>
						<div style={styles.row}>
							<Button 
								label="Login Teste"
								onClick={() => this.testLogin()}
								style={styles.button}
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

/* Style */
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
	},

	button: {
		width: '100%'
	},

	version: {
		color: '#101010',
		fontWeight: 'bold',
		position: 'absolute',
		right: '0',
		bottom: '0',
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadSpots, setUser }, dispatch);

export default connect(null, mapDispatchToProps)(LoginScreen);