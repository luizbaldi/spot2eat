import React, { Component } from 'react';

/* Libs */
import { FaCheck } from 'react-icons/lib/fa';
import swal from 'sweetalert2';
import _ from 'lodash';

/* Components */
import AddNewSpotModal from './modal/AddNewSpot';
import Button from './Button';
import Loader from './Loader';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddSpotModalOpen: false,
      isLoading: false
    };

    this.onModalStateChange = this.onModalStateChange.bind(this);
    this.onAddNewSpot = this.onAddNewSpot.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
    this.renderGridRows = this.renderGridRows.bind(this);
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
  setLoadingState(loadingState) {
    this.setState({
      isLoading: loadingState
    });
  }
  onAddNewSpot(spot) {
    this.props.insertSpot(
      {
        userId: this.props.user.id,
        ...spot
      },
      () => {
        swal(
          'Sucesso!',
          'Seu novo local foi adicionado :)',
          'success'
        );
        this.onModalStateChange('close');
      }
    );
  }
  renderGridRows() {
    const spots = Object.assign({}, this.props.spots);
    const gridRows = Object.keys(spots).map(spotId => {
      const spot = spots[spotId];
      return (
        <tr
          key={spotId}
          style={this.props.selectedSpots[spotId] ? style.selectedRow : style.row}
          onClick={() => this.props.onSelectSpot(spot, spotId)}
        >
          <td style={style.checkbox}>
            {this.props.selectedSpots[spotId] ?
              <FaCheck />
              : null
            }
          </td>
          <td style={style.nameColumn}>{spot.name}</td>
          <td style={style.daysColumn}>{this.getWeekDaysLabel(spot.selectedDays)}</td>
        </tr>
      )
    });
    return gridRows;
  }
  getWeekDaysLabel(selectedDays) {
    let weekDays = '';
    _.forEach(selectedDays, (day, idx, selectedDays) => {
      if (day) {
        const comma = _.max(Object.keys(selectedDays)) === idx.toString() ? '' : ',';
        weekDays += ` ${day.name}${comma}`;
      }
    });
    return weekDays;
  }
  hasSelectedSpots() {
    const hasSelectedSpots = _.some(this.props.selectedSpots, spot => spot != null);
    return hasSelectedSpots && !_.isEmpty(this.props.selectedSpots);
  }
  render() {
    const columns = ['', 'Nome', 'Dias da Semana'];
    return (
      <div>
        {this.state.isLoading ?
          <Loader />
          : <div>
            <div style={this.hasSelectedSpots() ? style.halfButton : style.fullButton}>
              <Button
                label={"Adicionar novo local"}
                onClick={() => this.onModalStateChange('open')}
              />
            </div>
            <div style={this.hasSelectedSpots() ? style.halfButton : style.hiddenButton}>
              <Button
                label={"Remover locais selecionados"}
                onClick={this.props.onRemoveSpots}
              />
            </div>
            {!_.isEmpty(this.props.spots) ?
              <table style={style.table}>
                <thead>
                  <tr style={style.head}>
                    {columns.map((column, idx) => <th key={idx}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>{this.renderGridRows()}</tbody>
              </table>
              : <div style={style.emptyMessageContainer}>
                <span style={style.emptyMessageText}>
                  <p style={style.paragraph}>Oops, parece que você ainda não possui nenhum local cadastrado.</p>
                  <p style={style.paragraph}>Adicione novos locais acima :)</p>
                </span>
              </div>
            }
            <AddNewSpotModal
              isOpen={this.state.isAddSpotModalOpen}
              onModalStateChange={this.onModalStateChange}
              onAddNewSpot={this.onAddNewSpot}
            />
          </div>
        }
      </div>
    );
  }
};

const style = {
  table: {
    width: '98%',
    margin: '8px',
    textAlign: 'center'
  },
  head: {
    fontWeight: 600,
    height: '40px',
    lineHeight: '38px',
    backgroundColor: 'rgba(239, 149, 156, 0.5)',
    border: '1px solid #bf8e8e',
    borderRadius: '20px'
  },
  row: {
    height: '38px',
    lineHeight: '36px',
    borderBottom: '1px solid #bf8e8e',
    transition: 'background-color 0.3s ease'
  },
  selectedRow: {
    height: '38px',
    lineHeight: '36px',
    borderBottom: '1px solid #bf8e8e',
    backgroundColor: 'rgba(142, 142, 142, 0.74)',
    transition: 'background-color 0.3s ease'
  },
  checkbox: {
    width: '55px',
    color: '#3EFF3B',
    position: 'absolute'
  },
  fullButton: {
    width: '96%',
    padding: '10px 0',
    marginLeft: '2%',
    transition: 'width 0.2s ease'
  },
  halfButton: {
    width: '48%',
    padding: '10px 0',
    display: 'inline-block',
    marginRight: '1%',
    transition: 'width 0.2s ease'
  },
  hiddenButton: {
    width: '0',
    transition: 'width 0.2s ease',
    position: 'absolute',
    right: '-200px',
    top: '60px',
    whiteSpace: 'nowrap'
  },
  emptyMessageContainer: {
    width: '100%',
    height: '75vh',
    textAlign: 'center',
    display: 'table'
  },
  emptyMessageText: {
    display: 'table-cell',
    verticalAlign: 'middle',
    fontSize: '1.4em',
    padding: '40px'
  },
  nameColumn: {
    width: '55%'
  },
  paragraph: {
    lineHeight: '135%'
  },
  daysColumn: {
    width: '45%'
  }
};

export default Grid;
