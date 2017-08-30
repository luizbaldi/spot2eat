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
		this.onRemoveSpots = this.onRemoveSpots.bind(this);
		this.reloadSpots = this.reloadSpots.bind(this);
	}
	componentWillMount() {
		this.reloadSpots();
	}
	onSelectSpot(spot) {
		let selectedSpots = this.state.selectedSpots;
		
		let spotToRemoveIndex = selectedSpots.findIndex(currentSpot => currentSpot.spotId === spot.spotId);

		// Handle if spot is being selected or unselected
		if (spotToRemoveIndex !== -1) {
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
	onRemoveSpots() {
		let selectedSpots = this.state.selectedSpots;
		axios.get("https://api.myjson.com/bins/t7mlr")
			.then(({data}) => {
				let updatedSpots = data.filter(spot => {
					return !selectedSpots.some(spotToRemove => spot.spotId === spotToRemove.spotId);
				});
				axios.put("https://api.myjson.com/bins/t7mlr", updatedSpots)
					.then(() => {
						alert("Restaurantes removidos com sucesso.");
						this.reloadSpots();
						this.setState({
							selectedSpots: []
						})
					});
			})
			.catch(err => {
				alert("Erro ao remover restaurantes.");
			});
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader showFooter screenName="Gerenciar Locais">
				<div style={styles.content}>
					<Grid 
						spots={this.state.spotsData}
						selectedSpots={this.state.selectedSpots}
						onSelectSpot={this.onSelectSpot}
						reloadSpots={this.reloadSpots}
						onRemoveSpots={this.onRemoveSpots} />
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