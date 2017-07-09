import React, { Component } from 'react';
import Sidebar from 'react-sidebar';

/*
 * Component
 */
class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: false
		};

		this.onToggleSidebar = this.onToggleSidebar.bind(this);
	}

	onToggleSidebar() {
		let inverseSidebarState = !this.state.sidebarOpen;
		this.setState({
			sidebarOpen: inverseSidebarState
		});
	}

	render() {
		let sideBarContent = <b>Spot2Eat</b>;
		return (
			<div>
				<Sidebar sidebar={sideBarContent}
						open={this.state.sidebarOpen}
						onSetOpen={this.onToggleSidebar} >
					<hr />
					<ul>
						<li><b>Gerenciar restaurantes</b></li>
						<li><b>Logout</b></li>
					</ul>
				</Sidebar>
				<header onClick={this.onToggleSidebar}></header>
			</div>
		);
	}
}

export default Header;
