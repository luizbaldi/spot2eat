import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import SidebarContent from './SidebarContent';
import { TiThMenu } from 'react-icons/lib/ti'

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
	}

	componentWillMount() {
		let user = localStorage.getItem('user');
		this.setState({
			user: JSON.parse(user)
		});
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
		localStorage.setItem('user', null);
		this.props.history.push('/');
	}

	onSelectPlaceClick() {
		this.props.history.push('/dashboard');
	}

	render() {
		let sidebar = <SidebarContent
							user={this.state.user}
							onManageSpotsClick={this.onManageSpotsClick}
							onLogoutClick={this.onLogoutClick}
							onSelectPlaceClick={this.onSelectPlaceClick} />;
		const sidebarProps = {
			sidebar: sidebar,
			open: this.state.sidebarOpen
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

export default Header;
