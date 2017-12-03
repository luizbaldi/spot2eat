import React from 'react';

/* Components */
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';

const FullScreenContainer = (props) => {
	return (
		<div style={styles.container}>
			{props.loadingState ? 
				<Loader />
				: <div>
					{props.showHeader ?
						<Header {...props} screenName={props.screenName}>
							{props.children}
						</Header>
						: <div>
							{props.children}
						</div>
					}
					{props.showFooter ?
						<Footer {...props} style={styles.footer} />
						: null
					}
				</div>
			}
		</div>
	);
}

/* Style */
const styles = {
	container: {
		background: 'url(img/blue-people-bg.jpg) no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		color: 'white',
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: '100%',
		overflowY: 'auto'
	}
};

export default FullScreenContainer;