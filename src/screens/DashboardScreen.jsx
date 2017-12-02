import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';
import { TiFilter } from 'react-icons/lib/ti'
import FilterDaysModal from '../components/modal/FilterDays';

/* Libs */
import swal from 'sweetalert2';

/* Redux */
import { getRandomUserSpot } from '../actions/SpotsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			isLoading: false,
			isFilterModalOpen: false,
			filterDays: {
				1: { name: 'Dom' },
				2: { name: 'Seg' },
				3: { name: 'Ter' },
				4: { name: 'Qua' },
				5: { name: 'Qui' },
				6: { name: 'Sex' },
				7: { name: 'Sab' }
			}
		};

		this.generateRandomSpot = this.generateRandomSpot.bind(this);
		this.setLoadingState = this.setLoadingState.bind(this);
		this.getLocationMessage = this.getLocationMessage.bind(this);
		this.setModalState = this.setModalState.bind(this);
		this.setFilter = this.setFilter.bind(this);
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
				this.props.getRandomUserSpot(this.props.spots, this.state.filterDays, this.props.user, () => {
					swal(
						'Ops...',
						'Vá em Menu Lateral -> Gerenciar Restaurantes e cadastre seus spots :)',
						'info'
					);
				});
			});
	}
	playDrumsSound() {
		/* Just a little drama pause */
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 1200);
		});
		return promise; 
	}
	getLocationMessage() {
		return this.props.currentSpot
			? `Local: ${this.props.currentSpot.name}`
			: 'Nenhum local selecionado';
	}
	setModalState(state) {
		this.setState({ isFilterModalOpen: state });
	}
	setFilter() {
		this.setState({ isFilterModalOpen: false });
		swal(
			'',
			'Filtro atualizado com sucesso!',
			'success'
		);
	}
	render() {
		return (
			<FullScreenContainer {...this.props} showHeader screenName="Dashboard" loadingState={this.state.isLoading}>
				<div style={style.content}>
					<div
						style={style.filter}
						onClick={() => this.setModalState(true)}
					>
						<span style={style.filterLabel}>Opções de filtro</span>
						<span><TiFilter /></span>
					</div>
					<div style={style.result}>
						<p style={style.resultText}>{this.getLocationMessage()}</p>
					</div>
					<Button
						label="Sortear local"
						onClick={this.generateRandomSpot}
					/>
				</div>
				<FilterDaysModal 
					isOpen={this.state.isFilterModalOpen}
					closeModal={() => this.setModalState(false)}
					setFilter={this.setFilter}
				/>
			</FullScreenContainer>
		);
	}
}

/* Style */
const style = {
	content: {
		marginTop: '60px',
		width: '100%',
		textAlign: 'center',
		padding: '25px',
		position: 'absolute',
		bottom: '15px'
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
	},
	filter: {
		margin: '12px 0'
	},
	filterLabel: {
		marginRight: '12px'
	}
};

const mapStateToProps = ({ spots, user, currentSpot }) => ({ spots, user, currentSpot });

const mapDispatchToProps = dispatch => bindActionCreators({ getRandomUserSpot }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);