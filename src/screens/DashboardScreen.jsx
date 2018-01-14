import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';
import { TiFilter } from 'react-icons/lib/ti'
import FilterDaysModal from '../components/modal/FilterDays';

/* Libs */
import swal from 'sweetalert2';
import styled from 'styled-components';

/* Redux */
import { getRandomUserSpot } from '../actions/SpotsActions';
import { setFilter, toggleDay } from '../actions/FilterDaysActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isFilterModalOpen: false
    };

    this.generateRandomSpot = this.generateRandomSpot.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
    this.getLocationMessage = this.getLocationMessage.bind(this);
    this.setModalState = this.setModalState.bind(this);
    this.setFilter = this.setFilter.bind(this);

    this.props.setFilter({
      1: { name: 'Dom' },
      2: { name: 'Seg' },
      3: { name: 'Ter' },
      4: { name: 'Qua' },
      5: { name: 'Qui' },
      6: { name: 'Sex' },
      7: { name: 'Sab' }
    });
  }
  setLoadingState(loadingState) {
    this.setState({
      isLoading: loadingState
    });
  }
  generateRandomSpot() {
    this.setLoadingState(true);
    this.playDrumsSound()
      .then(() => {
        this.setLoadingState(false);
        this.props.getRandomUserSpot(this.props.spots, this.props.filterDays, this.props.user, () => {
          swal(
            'Ops...',
            'Vá em Menu Lateral -> Gerenciar Restaurantes e cadastre seus spots :)',
            'info'
          );
        });
      });
  }
  playDrumsSound() {
    /* Just a little drama pause */
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1200);
    });
    return promise;
  }
  getLocationMessage() {
    return this.props.currentSpot
      ? `Local: ${this.props.currentSpot.name}`
      : 'Nenhum local selecionado';
  }
  setModalState(state) {
    this.setState({ isFilterModalOpen: state });
  }
  setFilter() {
    this.setState({ isFilterModalOpen: false });
    swal(
      '',
      'Filtro atualizado com sucesso!',
      'success'
    );
  }
  render() {
    return (
      <FullScreenContainer {...this.props} showHeader screenName="Dashboard" loadingState={this.state.isLoading}>
        <Content>
          <Filter onClick={() => this.setModalState(true)} >
            <span>Opções de filtro</span>
            <span><TiFilter /></span>
          </Filter>
          <Result>
            <p>{this.getLocationMessage()}</p>
          </Result>
          <Button
            label="Sortear local"
            onClick={this.generateRandomSpot}
          />
        </Content>
        <FilterDaysModal
          isOpen={this.state.isFilterModalOpen}
          setFilter={this.setFilter}
          toggleDay={this.props.toggleDay}
          filterDays={this.props.filterDays}
        />
      </FullScreenContainer>
    );
  }
}

/* Styled components */
const Content = styled.div`
  margin-top: 60px;
  width: 100%;
  text-align: center;
  padding: 25px;
  position: absolute;
  bottom: 15px;
`;

const Filter = styled.div`
  margin: 12px 0;

  > span {
    margin-right: 12px;
  }
`;

const Result = styled.div`
  background: rgba(0, 0, 0, 0.4);
  height: 44px;
  padding: 15px;
  border-radius: 22px;
  margin-bottom: 7px;

  > p {
    color: white;
  }
`;

const mapStateToProps = ({ spots, user, currentSpot, filterDays }) => ({ spots, user, currentSpot, filterDays });

const mapDispatchToProps = dispatch => bindActionCreators({ getRandomUserSpot, setFilter, toggleDay }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
