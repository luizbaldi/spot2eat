import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import SidebarContent from './SidebarContent';

/*
 * Component
 */
class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: false,
			transitions: true,
			touch: true,
			shadow: true
		};

		this.onToggleSidebar = this.onToggleSidebar.bind(this);
		this.onManageSpotsClick = this.onManageSpotsClick.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
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
		// @toDo: end user session
		this.props.history.push('/');
	}

	render() {
		let sidebar = <SidebarContent
							onManageSpotsClick={this.onManageSpotsClick}
							onLogoutClick={this.onLogoutClick} />;
		const sidebarProps = {
			sidebar: sidebar,
			open: this.state.sidebarOpen,
			touch: this.state.touch,
			shadow: this.state.shadow,
			transitions: this.state.transitions
		};
		return (
			<div>
				<Sidebar {...sidebarProps} >
					<b style={styles.title}>{this.props.screenName}</b>
				</Sidebar>
				<header onClick={this.onToggleSidebar} style={styles.header} >
				</header>
			</div>
		);
	}
}

/*
 * Style
 */
const styles = {
	header: {
		position: 'fixed',
	    left: '0px',
	    top: '0px',
	    height:' 40px',
	    width: '100%',
	    background: '#E84855',
	    color: '#9d9d9d'
	},
	title: {
		color: '#fafafa',
	    padding: '10px 40px',
	    height: '100%',
	    display: 'inline-block'
	}
};

export default Header;
