import React, { Component } from 'react';
import Modal from 'react-modal';
import Button from '../Button';

class AddNewSpotModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spotName: ''
        };

        this.onFieldChange = this.onFieldChange.bind(this);
    }
    onFieldChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel="Adicionar Novo Restaurante"
                style={customStyles}
            >
                <span style={style.title}>Adicione um novo local aqui :)</span>
                <form>
                    <input placeholder="Nome do local"
                        onChange={this.onFieldChange}
                        name="spotName"
                        style={style.input}
                    />
                </form>
                <div style={style.buttonContainer}>
                    <Button
                        label={'Adicionar'}
                        onClick={() => this.props.onAddNewSpot(this.state)}
                    />
                </div>
                <div style={style.buttonContainer}>
                    <Button
                        label={'Fechar'}
                        onClick={() => this.props.onModalStateChange('close')}
                    />
                </div>
            </Modal>
        );
    }
}

/*
 *
 */
const style = {
    buttonContainer: {
        margin: '12px 0'
    },
    input: {
        background: 'white',
        border: 'none',
        borderRadius: '22px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, .5)',
        display: 'block',
        height: '44px',
        fontSize: '16px',
        padding: '0 22px',
        width: '100%'
    },
    title: {
        display: 'block',
        marginBottom: '32px',
        fontSize: '1.4em',
        textAlign: 'center'
    }
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 220, 222, 0.89)'
    }
};

export default AddNewSpotModal;