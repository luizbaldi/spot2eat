import React, { Component } from 'react';
import Header from '../../shared/components/header/Header';
import Footer from '../../shared/components/footer/Footer';

const Dashboard = (props) => {
	return (
		<div className="app-container bg-color-default">
			<Header />
	        <Footer />
		</div>
	);
}

export default Dashboard;