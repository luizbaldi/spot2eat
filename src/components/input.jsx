/*
 * Dependencies
 */
import React from 'react';

/*
 * Component
 */
export default class Input extends React.Component {
	render(){
		return (<input type={this.props.type} placeholder={this.props.placeholder}/>);
	}
}

Input.Types = {
	TEXT: 'text',
	PASSWORD: 'password',
	EMAIL: 'email'
};

