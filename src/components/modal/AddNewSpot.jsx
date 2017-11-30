import React, { Component } from 'react';
import Button from '../Button';
import Modal from 'react-modal';

class AddNewSpotModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            selectedDays: {
                1: { name: 'Dom' },
                2: { name: 'Seg' },
                3: { name: 'Ter' },
                4: { name: 'Qua' },
                5: { name: 'Qui' },
                6: { name: 'Sex' },
                7: { name: 'Sab' } 
            }
        };

        this.onFieldChange = this.onFieldChange.bind(this);
    }
    onFieldChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    onSelectDay(day) {
        let selectedDays = Object.assign({}, this.state.selectedDays);
        if (selectedDays[day.id]) {
            delete selectedDays[day.id];
        } else {
            selectedDays[day.id] = { name: day.name };
        }
        this.setState({ selectedDays });
    }
    render() {
        const weekDays = [
            { id: 1, name: 'Dom' }, 
            { id: 2, name: 'Seg' }, 
            { id: 3, name: 'Ter' }, 
            { id: 4, name: 'Qua' }, 
            { id: 5, name: 'Qui' }, 
            { id: 6, name: 'Sex' }, 
            { id: 7, name: 'Sab' }
        ];

        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel="Adicionar Novo Restaurante"
                style={modalStyle}
            >
                <span style={style.title}>Novo local</span>
                <hr />
                <form>
                    <input placeholder="Nome do local"
                        onChange={this.onFieldChange}
                        name="name"
                        style={style.input}
                    />
                </form>
                <span style={style.weekDaysLabel}>Dias da semana</span>
                <div style={style.daysContainer}>
                    {weekDays.map(day => {
                        return (
                            <span 
                                key={day.id}
                                style={this.state.selectedDays[day.id] ? style.weekDay : style.disabledDay}
                                onClick={() => this.onSelectDay(day)}
                            >
                                {day.name}
                            </span>
                        )
                    })}
                </div>
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
        width: '100%',
        textAlign: 'center'
    },
    title: {
        display: 'block',
        marginBottom: '12px',
        fontSize: '1.4em',
        textAlign: 'center'
    },
    weekDaysLabel: {
        display: 'block',
        textAlign: 'center',
        margin: '12px 0',
        fontWeight: 'bold'
    },
    daysContainer: {
        width: '100%'
    },
    weekDay: {
        backgroundColor: '#dd5555d9',
        border: '1px solid #bd6d73',
        width: '36px',
        height: '36px',
        display: 'inline-block',
        borderRadius: '4px',
        lineHeight: '32px',
        textAlign: 'center',
        margin: '0 3px',
        color: '#fafafa'
    },
    disabledDay: {
        backgroundColor: 'rgba(162, 162, 162, 0.85)',
        border: '1px solid rgb(187, 187, 187)',
        width: '36px',
        height: '36px',
        display: 'inline-block',
        borderRadius: '4px',
        lineHeight: '32px',
        textAlign: 'center',
        margin: '0 3px',
        color: '#fafafa'
    }
};

const modalStyle = {
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