import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Grid from '../components/Grid';

/* Libs */
import _ from 'lodash';
import styled from 'styled-components';

/* Redux */
import { connect } from 'react-redux';
import { insertSpot, updateSpots } from '../actions/SpotsActions';
import { bindActionCreators } from 'redux';

class ManageSpotsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSpots: {},
      isLoading: false
    };

    this.onSelectSpot = this.onSelectSpot.bind(this);
    this.onRemoveSpots = this.onRemoveSpots.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
  }
  onSelectSpot(spot, spotIndex) {
    let selectedSpots = this.state.selectedSpots;
    let spotToRemoveIndex = selectedSpots[spotIndex];

    // Handle if spot is being selected or unselected
    if (spotToRemoveIndex) {
      selectedSpots[spotIndex] = null;
    } else {
      selectedSpots[spotIndex] = spot;
    }

    this.setState({ selectedSpots });
  }
  setLoadingState(loadingState) {
    this.setState({
      isLoading: loadingState
    });
  }
  onRemoveSpots() {
    let selectedSpots = this.state.selectedSpots;
    let spots = Object.assign({}, this.props.spots);

    _.forEach(spots, (spot, spotId) => {
      _.forEach(selectedSpots, (spotToRemove, spotToRemoveId) => {
        if (spotId === spotToRemoveId) {
          spots[spotId] = null;
        }
      });
    });

    this.props.updateSpots(spots);
  }
  filterUserSpots() {
    let userSpots = {};
    _.forEach(this.props.spots, (spot, id) => {
      if (spot.userId === this.props.user.id) {
        userSpots[id] = spot;
      }
    });
    return userSpots;
  }
  render() {
    return (
      <FullScreenContainer {...this.props} showHeader showFooter screenName="Gerenciar Locais" loadingState={this.state.isLoading}>
        <Content>
          <Grid
            spots={this.filterUserSpots()}
            selectedSpots={this.state.selectedSpots}
            onSelectSpot={this.onSelectSpot}
            onRemoveSpots={this.onRemoveSpots}
            user={this.props.user}
            insertSpot={this.props.insertSpot}
          />
        </Content>
      </FullScreenContainer>
    );
  }
};

/* Styled components */
const Content = styled.div`
  margin-top: 50px;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
`;

const mapStateToProps = ({ user, spots }) => ({ user, spots });

const mapDispatchToProps = dispatch => bindActionCreators({ insertSpot, updateSpots }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpotsScreen);
