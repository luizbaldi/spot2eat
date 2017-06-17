import React, { Component } from 'react';
import Header from './shared/components/Header.jsx';
import Footer from './shared/components/Footer.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
}

export default App;

