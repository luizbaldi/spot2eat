import React from 'react';
import { Navbar } from 'react-bootstrap/lib';

const Header = () => {
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<a>Spot2Eat</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
		</Navbar>
	);
}

export default Header;
