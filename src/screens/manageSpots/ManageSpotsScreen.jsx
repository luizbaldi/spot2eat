import React, { Component } from 'react';
import FullScreenContainer from '../../components/FullScreenContainer';
import Grid from '../../components/Grid';
import axios from 'axios';
import swal from 'sweetalert2';

/*
 * Component
 */
class ManageSpotsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			spotsData: [],
			selectedSpots: [],
			isLoading: false
		};

		this.onSelectSpot = this.onSelectSpot.bind(this);
		this.onRemoveSpots = this.onRemoveSpots.bind(this);
		this.reloadSpots = this.reloadSpots.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
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
	setLoadingState(loadingState) {
		this.setState({
			isLoading: loadingState
		});
	}
	reloadSpots() {
		this.setLoadingState(true);
		axios.get("https://api.myjson.com/bins/t7mlr")
			.then(({data}) => {
				this.setLoadingState(false);
				const currentUser = JSON.parse(localStorage.getItem('user'));
				const spots = data.filter(spot => spot.userId === currentUser.id);
				this.setState({
					spotsData: spots
				});
			})
			.catch(err => {
				this.setLoadingState(false);
				swal("Erro ao carregar restaurantes.");
				this.props.history.goBack();
			});
	}
	onRemoveSpots() {
		let selectedSpots = this.state.selectedSpots;
		this.setLoadingState(true);
		axios.get("https://api.myjson.com/bins/t7mlr")
			.then(({data}) => {
				let updatedSpots = data.filter(spot => {
					return !selectedSpots.some(spotToRemove => spot.spotId === spotToRemove.spotId);
				});
				axios.put("https://api.myjson.com/bins/t7mlr", updatedSpots)
					.then(() => {
						this.setLoadingState(false);
						swal("Restaurantes removidos com sucesso.");
						this.reloadSpots();
						this.setState({
							selectedSpots: []
						})
					});
			})
			.catch(err => {
				this.setLoadingState(false);
				swal("Erro ao remover restaurantes.");
			});
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader showFooter screenName="Gerenciar Locais" loadingState={this.state.isLoading}>
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