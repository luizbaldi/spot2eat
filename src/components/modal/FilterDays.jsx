import React from 'react';
import Modal from 'react-modal';
import colors from '../../util/colors';
import Button from '../Button';

const FilterDaysModal = ({ isOpen, setFilter, toggleDay, filterDays }) => {
  const days = [
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
      isOpen={isOpen}
      contentLabel="Filtrar dias"
      style={modalStyle}
    >
      <span style={style.title}>Dias a serem filtrados</span>
      <hr />
      <div style={style.content}>
        {days.map(day => (
          <span
            key={day.id}
            style={filterDays[day.id] ? style.day : style.disabledDay}
            onClick={() => toggleDay(filterDays, day)}
          >
            {day.name}
          </span>
        ))}
      </div>
      <hr />
      <Button
        label="OK"
        onClick={setFilter}
      />
    </Modal>
  );
};

const defaultDayStyle = {
  display: 'block',
  height: '40px',
  lineHeight: '38px',
  textAlign: 'center',
  borderRadius: '48px',
  margin: '5px 0',
  color: colors.white,
  transition: 'background-color 0.3s ease'
};

const style = {
  title: {
    display: 'block',
    marginBottom: '12px',
    fontSize: '1.4em',
    textAlign: 'center',
    color: colors.text
  },
  content: {
    width: '100%',
    marginTop: '8px'
  },
  day: {
    ...defaultDayStyle,
    backgroundColor: colors.tertiary,
  },
  disabledDay: {
    ...defaultDayStyle,
    backgroundColor: colors.grey,
  }
}

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

export default FilterDaysModal;
