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
	}

	onToggleSidebar() {
		let inverseSidebarState = !this.state.sidebarOpen;
		this.setState({
			sidebarOpen: inverseSidebarState
		});
	}

	render() {
		let sidebar = <SidebarContent />;
		const sidebarProps = {
			sidebar: sidebar,
			open: this.state.sidebarOpen,
			touch: this.state.touch,
			shadow: this.state.shadow,
			transitions: this.state.transitions
		};
		return (
			<div>
				<header onClick={this.onToggleSidebar} style={styles.header} >
					<Sidebar {...sidebarProps} >
						<b style={styles.title}>{this.props.screenName}</b>
					</Sidebar>
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
