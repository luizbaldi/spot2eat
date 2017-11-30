import React, { Component } from 'react';

/* Libs */
import Sidebar from 'react-sidebar';
import SidebarContent from './SidebarContent';
import { TiThMenu } from 'react-icons/lib/ti'
import swal from 'sweetalert2';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/UserActions';

/*
 * Component
 */
class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: false,
			user: null
		};

		this.onToggleSidebar = this.onToggleSidebar.bind(this);
		this.onManageSpotsClick = this.onManageSpotsClick.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
		this.onSelectPlaceClick = this.onSelectPlaceClick.bind(this);
		this.onSetOpen = this.onSetOpen.bind(this);
	}

	componentWillMount() {
		let user = this.props.user;

		if (!user) {
			this.props.history.push('/');
			swal({
				title: 'Ops!',
				text: 'Você precisa estar logado para continuar',
				type: 'info'
			});
		}
	}

	onToggleSidebar() {
		let inverseSidebarState = !this.state.sidebarOpen;
		this.setState({
			sidebarOpen: inverseSidebarState
		});
	}

	onManageSpotsClick() {
		this.props.history.push('/manageSpots');
	}

	onLogoutClick() {
		this.props.setUser(null);
		this.props.history.push('/');
	}

	onSelectPlaceClick() {
		this.props.history.push('/dashboard');
	}

	onSetOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	render() {
		let sidebar = <SidebarContent
							onManageSpotsClick={this.onManageSpotsClick}
							onLogoutClick={this.onLogoutClick}
							onSelectPlaceClick={this.onSelectPlaceClick} />;
		const sidebarProps = {
			sidebar: sidebar,
			open: this.state.sidebarOpen,
			onSetOpen: this.onSetOpen,
			shadow: true
		};
		return (
			<div>
				<Sidebar {...sidebarProps} >
					<header onClick={this.onToggleSidebar} style={styles.header}>
						<div style={styles.headerIcon}>
							<TiThMenu />
						</div>
						<b style={styles.title}>{this.props.screenName}</b>
					</header>
					{this.props.children}
				</Sidebar>
			</div>
		);
	}
}

/*
 * Style
 */
const styles = {
	header: {
		padding: '17px 20px',
		position: 'fixed',
		left: '0px',
		top: '0px',
		height: '50px',
		width: '100%',
		background: '#E84855',
		color: '#9d9d9d',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	},
	title: {
		color: '#fafafa',
	    height: '100%',
		display: 'inline-block',
		marginLeft: '30px'
	},
	headerIcon: {
		color: '#fafafa',
		margin: '-2px -2px',
		position: 'absolute',
		fontSize: '1.3em'
	}
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);