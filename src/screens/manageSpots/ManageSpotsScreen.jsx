import React from 'react';
import FullScreenContainer from '../../components/FullScreenContainer';
import Footer from '../../components/Footer';

/*
 * Component
 */
const ManageSpotsScreen = (props) => {
	return (
		<FullScreenContainer {...props} showHeader showFooter screenName="Gerenciar Restaurantes">
			<div style={styles.content}>
				<b>Manage Spots Screen (toDo)</b>
			</div>
		</FullScreenContainer>
	);
};

/*
 * Style
 */
const styles = {
	content: {
		marginTop: '50px',
		width: '100%',
		textAlign: 'center'
	}
}

export default ManageSpotsScreen;