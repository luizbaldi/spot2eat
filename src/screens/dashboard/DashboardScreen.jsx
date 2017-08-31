import React, { Component } from 'react';
import FullScreenContainer from '../../components/FullScreenContainer';
import axios from 'axios';

/*
 * Component
 */
class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSpot: null,
			isLoading: false
		};

		this.generateRandomSpot = this.generateRandomSpot.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
	}
	setLoadingState(loadingState) {
		this.setState({
			isLoading: loadingState
		});
	}
	generateRandomSpot() {
		this.setLoadingState(true);
		axios.get("https://api.myjson.com/bins/t7mlr")
			.then(({data}) => {
				this.setLoadingState(false);
				const currentUser = JSON.parse(localStorage.getItem('user'));
				const avaibleSpots = data.filter(spot => spot.userId === currentUser.id);

				if (avaibleSpots.length) {
					let randomSpot = avaibleSpots[this.getRandomInt(0, avaibleSpots.length -1)];
					this.setState({
						selectedSpot: randomSpot
					});
				} else {
					alert('Você ainda não possui nenhum local cadastrado. Adicione locais clicando no menu lateral em Gerenciar Restaurantes :)');
				}
			})
			.catch(err => {
				this.setLoadingState(false);
				alert('Erro ao carregar seu local aleatório. Tente novamente mais tarde.');
			})
	}
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader screenName="Dashboard" loadingState={this.state.isLoading}>
				<div style={styles.content}>
					{this.state.selectedSpot ?
						<div style={styles.result}>
							<p style={styles.resultText}>Local: {this.state.selectedSpot.name}</p>
						</div>
						: null
					}
					<button style={styles.button} onClick={this.generateRandomSpot}>Sortear local</button>
				</div>
			</FullScreenContainer>
		);
	}
}

/*
 * Style
 */
const styles = {
	content: {
		marginTop: '60px',
		width: '100%',
		textAlign: 'center',
		padding: '25px',
		position: 'absolute',
		bottom: '15px'
	},
	button: {
		background: '#E84855',
		border: 'none',
		borderRadius: '22px',
		boxShadow: '0 2px 5px rgba(0, 0, 0, .5)',
		color: 'white',
		height: '44px',
		fontSize: '16px',
		padding: '0 22px',
		width: '100%',
	},
	result: {
		background: 'rgba(0, 0, 0, 0.4)',
		height: '44px',
		padding: '15px',
		borderRadius: '22px',
		marginBottom: '7px'
	},
	resultText: {
		color: 'white'
	}
}

export default Dashboard;