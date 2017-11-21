import React, { Component } from 'react';

/* Libs */
import { TiChevronLeft } from 'react-icons/lib/ti'

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
			<footer className="bg-color-secundary" style={styles.footer}>
				<div style={styles.backButton} onClick={this.goBack}>
					<div style={styles.backIcon}>
						<TiChevronLeft />
					</div>
					<span style={styles.backText}>Voltar</span>
				</div>
			</footer>
		);
	}
}

/* Style */
const styles = {
	footer: {
		position: 'fixed',
	    left: '0px',
	    bottom: '0px',
	    height:' 40px',
	    width: '100%',
	    background: '#E84855',
	    color: '#9d9d9d'
	},
	backButton: {
	    color: '#fafafa',
	    width: "30%",
	    height: "100%",
	    lineHeight: "20px",
	    padding: '10px 40px',
	    display: 'inline-block'
	},
	backIcon: {
		position: 'absolute',
		bottom: '10px',
		fontSize: '1.2em'
	},
	backText: {
		marginLeft: '28px'
	}
};

export default Footer;