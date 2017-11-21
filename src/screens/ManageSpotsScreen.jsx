import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Grid from '../components/Grid';

/* Libs */
import axios from 'axios';
import swal from 'sweetalert2';
import _ from 'lodash';

/* Redux */
import { connect } from 'react-redux';
import { loadSpots, insertSpot, updateSpots } from '../actions/SpotsActions';
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
	onSelectSpot(spot, spotIndex) {
		let selectedSpots = this.state.selectedSpots;
		let spotToRemoveIndex = selectedSpots.findIndex((currentSpot, index) => currentSpot.id === spotIndex);

		// Handle if spot is being selected or unselected
		if (spotToRemoveIndex !== -1) {
			selectedSpots.splice(spotToRemoveIndex, 1);
		} else {
			selectedSpots.push(Object.assign(spot, { id: spotIndex }));
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
		let spots = Object.assign({}, this.props.spots);

		_.forEach(spots, spot => {
			_.forEach(selectedSpots, spotToRemove => {
				if (spot.id === spotToRemove.id) {
					spots[spot.id] = null;
				}
			});
		});

		this.props.updateSpots(spots, () => {
			swal(
				'Sucesso!',
				'Seus locais foram removidos com sucesso :)',
				'success'
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
						insertSpot={this.props.insertSpot}
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

const mapDispatchToProps = dispatch => bindActionCreators({ loadSpots, insertSpot, updateSpots }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpotsScreen);