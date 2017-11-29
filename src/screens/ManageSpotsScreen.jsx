import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Grid from '../components/Grid';

/* Libs */
import _ from 'lodash';

/* Redux */
import { connect } from 'react-redux';
import { insertSpot, updateSpots } from '../actions/SpotsActions';
import { bindActionCreators } from 'redux';

class ManageSpotsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSpots: {},
			isLoading: false
		};

		this.onSelectSpot = this.onSelectSpot.bind(this);
		this.onRemoveSpots = this.onRemoveSpots.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
	}
	onSelectSpot(spot, spotIndex) {
		let selectedSpots = this.state.selectedSpots;
		let spotToRemoveIndex = selectedSpots[spotIndex];

		// Handle if spot is being selected or unselected
		if (spotToRemoveIndex) {
			selectedSpots[spotIndex] = null;
		} else {
			selectedSpots[spotIndex] = spot;
		}

		this.setState({ selectedSpots });
	}
	setLoadingState(loadingState) {
		this.setState({
			isLoading: loadingState
		});
	}
	onRemoveSpots() {
		let selectedSpots = this.state.selectedSpots;
		let spots = Object.assign({}, this.props.spots);

		_.forEach(spots, (spot, spotId) => {
			_.forEach(selectedSpots, (spotToRemove, spotToRemoveId) => {
				if (spotId === spotToRemoveId) {
					spots[spotId] = null;
				}
			});
		});

		this.props.updateSpots(spots);
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader showFooter screenName="Gerenciar Locais" loadingState={this.state.isLoading}>
				<div style={styles.content}>
					<Grid 
						spots={_.filter(this.props.spots, spot => spot.userId === this.props.user.id)}
						selectedSpots={this.state.selectedSpots}
						onSelectSpot={this.onSelectSpot}
						onRemoveSpots={this.onRemoveSpots} 
						user={this.props.user}
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

const mapDispatchToProps = dispatch => bindActionCreators({ insertSpot, updateSpots }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpotsScreen);