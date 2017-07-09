import React, { Component } from 'react';

/*
 * Component
 */
class Footer extends Component {
	constructor(props) {
		super(props);

		this.goBack = this.goBack.bind(this);
	}
	goBack() {
		this.props.history.goBack();
	}
	render() {
		return (
			<footer className="bg-color-secundary">
				{this.props.showBack ?
					<div style={backButtonStyle} onClick={this.goBack}>
						Voltar
					</div>
					: false
				}
			</footer>
		);
	}
}

/*
 * Style
 */
const backButtonStyle = {
    width: "30%",
    height: "100%",
    fontSize: "1.4em",
    lineHeight: "40px",
    padding: "0 20px"
};

export default Footer;