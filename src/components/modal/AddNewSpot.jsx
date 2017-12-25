import React, { Component } from 'react';
import Button from '../Button';
import Modal from 'react-modal';
import colors from '../../util/colors';
import swal from 'sweetalert2';

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
    this.addNewSpot = this.addNewSpot.bind(this);
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
  addNewSpot() {
    if (this.state.name) {
      this.props.onAddNewSpot(this.state)
    } else {
      swal(
        'Ops',
        'Preencha o nome para prosseguir',
        'info'
      );
    }
  }
  render() {
    const weekDays = [
      { id: 2, name: 'Seg' },
      { id: 3, name: 'Ter' },
      { id: 4, name: 'Qua' },
      { id: 5, name: 'Qui' },
      { id: 6, name: 'Sex' }
    ];
    const weekendDays = [
      { id: 1, name: 'Dom' },
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
        <div style={style.daysRow}>
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
        <div style={style.daysRow}>
          {weekendDays.map(day => {
            return (
              <span
                key={day.id}
                style={this.state.selectedDays[day.id] ? style.weekendDay : style.disabledWeekend}
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
            onClick={this.addNewSpot}
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

const defaultStyle = {
  weekDayButton: {
    height: '40px',
    display: 'inline-block',
    borderRadius: '4px',
    lineHeight: '38px',
    textAlign: 'center',
    color: colors.white,
    transition: 'background-color 0.3s ease-in'
  },
};

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
    textAlign: 'center',
    color: colors.text
  },
  weekDaysLabel: {
    display: 'block',
    textAlign: 'center',
    margin: '14px 0',
    fontWeight: 'bold',
    color: colors.text
  },
  daysRow: {
    width: '100%',
    margin: '6px 0'
  },
  weekDay: {
    ...defaultStyle.weekDayButton,
    backgroundColor: colors.tertiary,
    width: '18%',
    margin: '0 1%'
  },
  weekendDay: {
    ...defaultStyle.weekDayButton,
    backgroundColor: colors.tertiary,
    width: '45%',
    margin: '0 2.5%'
  },
  disabledDay: {
    width: '18%',
    height: '40px',
    display: 'inline-block',
    borderRadius: '4px',
    lineHeight: '38px',
    textAlign: 'center',
    backgroundColor: colors.grey,
    color: colors.white,
    margin: '0 1%'
  },
  disabledWeekend: {
    width: '45%',
    height: '40px',
    display: 'inline-block',
    borderRadius: '4px',
    lineHeight: '38px',
    textAlign: 'center',
    backgroundColor: colors.grey,
    color: colors.white,
    margin: '0 2.5%'
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
    backgroundColor: colors.secondary
  }
};

export default AddNewSpotModal;
