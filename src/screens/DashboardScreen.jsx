import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';

/* Libs */
import { getRandomUserSpot } from '../actions/SpotsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = { isLoading: false };

		this.generateRandomSpot = this.generateRandomSpot.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
		this.getLocationMessage = this.getLocationMessage.bind(this);
	}
	setLoadingState(loadingState) {
		this.setState({
			isLoading: loadingState
		});
	}
	generateRandomSpot() {
		this.setLoadingState(true);
		this.playDrumsSound()
			.then(() => {
				this.setLoadingState(false);
				this.props.getRandomUserSpot(this.props.spots, this.props.user);
			});
	}
	playDrumsSound() {
		/* Plays audio to show result only after 1 sec (just a little drama) */
		const drumsAudio = new Audio('http://sprott.physics.wisc.edu/wop/sounds/Drumroll-1.wav');
		drumsAudio.play();
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 1000);
		});
		return promise; 
	}
	getLocationMessage() {
		return this.props.currentSpot
			? this.props.currentSpot.name
			: 'Nenhum local selecionado ou você ainda não possui locais cadastrados'
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader screenName="Dashboard" loadingState={this.state.isLoading}>
				<div style={styles.content}>
					<div style={styles.result}>
						<p style={styles.resultText}>Local: {this.getLocationMessage()}</p>
					</div>
					<button 
						style={styles.button}
						onClick={this.generateRandomSpot}
					>
						Sortear local
					</button>
				</div>
				
			</FullScreenContainer>
		);
	}
}

/* Style */
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
};

const mapStateToProps = ({ spots, user, currentSpot }) => ({ spots, user, currentSpot });

const mapDispatchToProps = dispatch => bindActionCreators({ getRandomUserSpot }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);