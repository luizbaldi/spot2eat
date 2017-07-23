import React, { Component } from 'react';
import Modal from 'react-modal';

class AddNewSpotModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spotName: ''
        };
        
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange({target}) {
		this.setState({
			[target.name]: target.value
		});
	}
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel="Adicionar Novo Restaurante"
            >
                
                <form>
                    <input placeholder="Spot name"
                        onChange={this.onFieldChange}
                        name="spotName" />
                </form>
                <button onClick={() => this.props.onModalStateChange('close')}>Close</button>
                <button onClick={() => this.props.onAddNewSpot(this.state)}>Adicionar</button>
            </Modal>
        );
    }
}

export default AddNewSpotModal;