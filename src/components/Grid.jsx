import React, { Component } from 'react';
import AddNewSpotModal from './modal/AddNewSpot';
import axios from 'axios';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddSpotModalOpen: false
        };

        this.onModalStateChange = this.onModalStateChange.bind(this);
        this.onAddNewSpot = this.onAddNewSpot.bind(this);
    }
    /*
     * @param: state
     * Accepted values: 'open' and 'close'
     */
    onModalStateChange(state) {
        let isModalOpen = state === 'open';
        this.setState({
            isAddSpotModalOpen: isModalOpen
        });
    }
    onAddNewSpot(spot) {
        axios.get("https://api.myjson.com/bins/t7mlr")
            .then(({data}) => {
                let currentUser = JSON.parse(localStorage.getItem('user'));
                let newSpot = {
                    spotId: data[data.length - 1].spotId + 1,
                    userId: currentUser.id,
                    name: spot.spotName
                };
                data.push(newSpot);
                axios.put("https://api.myjson.com/bins/t7mlr", data)
                    .then(response => {
                        alert("Spoted added successfully :)");
                        this.onModalStateChange('close');
                        this.props.reloadSpots();
                    })
                    .catch(err => {
                        alert("Error saving the new spot. Try again later.");
				        this.onModalStateChange('close');
                    });
            })
            .catch(err => {
				alert("Error saving the new spot. Try again later.");
				this.onModalStateChange('close');
			});
    }
    render() {
        const columns = ['', 'Id', 'Nome'];
        return (
            <div>
                <button onClick={() => this.onModalStateChange('open')}>Add new spot</button>
                { this.props.selectedSpots.length ?
                    <button onClick={this.props.onRemoveSpots}>Remove selected spots</button>
                    : null
                }
                { this.props.spots.length ?
                    <table>
                        <thead>
                            <tr>
                                {columns.map((column, idx) => <th key={idx}>{column}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                                {this.props.spots.map((spot, index) => {
                                    return (
                                        <tr key={`spot_${index}`}>
                                            <td><input type="checkbox" onClick={() => this.props.onSelectSpot(spot)} /></td>
                                            <td>{spot.spotId}</td>
                                            <td>{spot.name}</td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                : <div>Oops, seems like you don't have any spots registered. Add new spots clicking above :)</div>
                }
                <AddNewSpotModal 
                    isOpen={this.state.isAddSpotModalOpen}
                    onModalStateChange={this.onModalStateChange}
                    onAddNewSpot={this.onAddNewSpot} />
            </div>
        );
    }
};

export default Grid;