import React, { Component } from 'react';
import FullScreenContainer from '../../components/FullScreenContainer';

/*
 * Component
 */
class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSpot: null
		};

		this.generateRandomSpot = this.generateRandomSpot.bind(this);
	}
	generateRandomSpot() {
		const randomSpots = [
			'Serjão',
			'Alberto',
			'Aguinaldo',
			'Alagoas'
		];
		let randomSpot = randomSpots[this.getRandomInt(0, randomSpots.length -1)];
		this.setState({
			selectedSpot: randomSpot
		});
	}
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader>
				<div style={styles.content}>
					<p>Clique no botão abaixo para escolher o local</p>
					<button onClick={this.generateRandomSpot}>Escolher</button>
					{this.state.selectedSpot ?
						<p>Local selecionado: {this.state.selectedSpot}</p>
						: null
					}
				</div>
			</FullScreenContainer>
		);
	}
}

const styles = {
	content: {
		marginTop: '50px',
		width: '100%',
		textAlign: 'center'
	}
}

export default Dashboard;