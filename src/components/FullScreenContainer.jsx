import React, { Component } from 'react';

/*
 * Component
 */
class FullScreenContainer extends Component {
	render() {
		let newStyle = Object.assign(style, this.props.style);
		return (
			<div style={newStyle}>
				{this.props.children}
			</div>
		);
	}
};

/*
 * Style
 */
const style = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	width: '100%',
	'overflowY': 'hidden'
};

export default FullScreenContainer;