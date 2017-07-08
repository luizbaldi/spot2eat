import React, { Component } from 'react';
import './footer.css';

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
					<div className="back-button" onClick={this.goBack}>
						Voltar
					</div>
					: false
				}
			</footer>
		);
	}
}

export default Footer;