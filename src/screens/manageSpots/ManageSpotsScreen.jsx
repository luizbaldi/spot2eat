import React, { Component } from 'react';
import FullScreenContainer from '../../components/FullScreenContainer';
import Grid from '../../components/Grid';
import axios from 'axios';

/*
 * Component
 */
class ManageSpotsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			spotsData: [],
			selectedSpots: []
		};

		this.onSelectSpot = this.onSelectSpot.bind(this);
		this.reloadSpots = this.reloadSpots.bind(this);
	}
	componentWillMount() {
		this.reloadSpots();
	}
	onSelectSpot(spot) {
		let selectedSpots = this.state.selectedSpots;
		
		let spotToRemoveIndex;
		let isSpotSelected = selectedSpots.some((currentSpot, index) => {
			if (currentSpot.spotId === spot.spotId) {
				spotToRemoveIndex = index;
				return true;
			}
			return false;
		});

		// Handle if spot is being selected or unselected
		if (isSpotSelected) {
			selectedSpots.splice(spotToRemoveIndex, 1);
		} else {
			selectedSpots.push(spot);
		}

		this.setState({
			selectedSpots: selectedSpots
		})
	}
	reloadSpots() {
		axios.get("https://api.myjson.com/bins/t7mlr")
			.then(({data}) => {
				const currentUser = JSON.parse(localStorage.getItem('user'));
				const spots = data.filter(spot => spot.userId === currentUser.id);
				this.setState({
					spotsData: spots
				});
			})
			.catch(err => {
				alert("Erro ao carregar restaurantes.");
				this.props.history.goBack();
			});
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader showFooter screenName="Gerenciar Restaurantes">
				<div style={styles.content}>
					<Grid 
						spots={this.state.spotsData}
						selectedSpots={this.state.selectedSpots}
						onSelectSpot={this.onSelectSpot}
						reloadSpots={this.reloadSpots} />
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
		marginTop: '50px',
		width: '100%',
		textAlign: 'center',
		marginBottom: '50px'
	}
}

export default ManageSpotsScreen;