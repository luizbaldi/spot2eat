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
			selectedSpot: null
		};

		this.generateRandomSpot = this.generateRandomSpot.bind(this);
	}
	generateRandomSpot() {
		axios.get("https://api.myjson.com/bins/t7mlr")
			.then(({data}) => {
				let randomSpot = data[this.getRandomInt(0, data.length -1)];
				this.setState({
					selectedSpot: randomSpot
				});
			})
			.catch(err => {
				alert('Error generating your random spot. Try again later.');
			})
	}
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader screenName="Dashboard">
				<div style={styles.content}>
					<p>Clique no botão abaixo para escolher o local</p>
					<button onClick={this.generateRandomSpot}>Escolher</button>
					{this.state.selectedSpot ?
						<p>Local selecionado: {this.state.selectedSpot.name}</p>
						: null
					}
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
		marginTop: '50px',
		width: '100%',
		textAlign: 'center'
	}
}

export default Dashboard;