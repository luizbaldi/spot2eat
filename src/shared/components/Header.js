import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap/lib';
import Sidebar from 'react-sidebar';

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
					<b>Gerenciar pontos</b>
				</Sidebar>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<span className="glyphicon glyphicon-align-justify"
								onClick={this.onToggleSidebar} />
							<a>Spot2Eat</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
				</Navbar>
			</div>
		);
	}
}

export default Header;
