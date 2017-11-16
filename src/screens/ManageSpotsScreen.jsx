import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Grid from '../components/Grid';

/* Libs */
import axios from 'axios';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { loadSpots } from '../actions';
import { bindActionCreators } from 'redux';

class ManageSpotsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSpots: [],
			isLoading: false
		};

		this.onSelectSpot = this.onSelectSpot.bind(this);
		this.onRemoveSpots = this.onRemoveSpots.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
	}
	componentDidMount() {
		this.props.loadSpots(this.props.user);
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
						swal(
							'Sucesso',
							'Restaurantes removidos com sucesso',
							'success'
						);
						this.props.loadSpots(this.props.user);
						this.setState({
							selectedSpots: []
						})
					});
			})
			.catch(err => {
				this.setLoadingState(false);
				swal(
					'Ops...',
					'Erro ao remover restaurantes',
					'error'
				);
			});
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader showFooter screenName="Gerenciar Locais" loadingState={this.state.isLoading}>
				<div style={styles.content}>
					<Grid 
						spots={this.props.spots}
						selectedSpots={this.state.selectedSpots}
						onSelectSpot={this.onSelectSpot}
						loadSpots={this.props.loadSpots}
						onRemoveSpots={this.onRemoveSpots} 
						currentUser={this.props.user}
					/>
				</div>
			</FullScreenContainer>
		);
	}
};

/* Style */
const styles = {
	content: {
		marginTop: '50px',
		width: '100%',
		textAlign: 'center',
		marginBottom: '50px'
	}
};

const mapStateToProps = ({ user, spots }) => ({ user, spots });

const mapDispatchToProps = dispatch => bindActionCreators({ loadSpots }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpotsScreen);