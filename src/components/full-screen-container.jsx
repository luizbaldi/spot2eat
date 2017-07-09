/*
 * Dependencies
 */
import React, { Component } from 'react';

/*
 * Style
 */
const style = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	width: '100%'
};

/*
 * Component
 */
export default class FullScreenContainer extends Component {
	render(){
		let newStyle = Object.assign(style, this.props.style);
		return (
			<div style={newStyle}>
				{this.props.children}
			</div>
		);
	}
}