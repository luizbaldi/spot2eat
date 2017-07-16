import React from 'react';
import Header from './Header';

/*
 * Component
 */
const FullScreenContainer = (props) => {
	let newStyle = Object.assign(customStyle, props.style);
	return (
		<div style={newStyle}>
			{props.showHeader ?
				<Header screenName="Dashboard" {...props}>
					{props.children}
				</Header>
				: <div>
					{props.children}
				</div>
			}
		</div>
	);
}

/*
 * Style
 */
const customStyle = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	width: '100%',
	overflowY: 'hidden'
};

export default FullScreenContainer;