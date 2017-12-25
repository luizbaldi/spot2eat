import { ref as firebase } from '../util/fire';
import _ from 'lodash';
import { getRandomInt } from '../util/util';

/* Action Types */
export const GET_RANDOM_SPOT = 'GET_RANDOM_SPOT';
export const LOAD_SPOTS = 'LOAD_SPOTS';
export const INSERT_SPOT = 'INSERT_SPOT';

/* Action Creators */
export function loadSpots() {
  return dispatch => {
    firebase.child('spots').on('value', snapshot => {
      dispatch({
        type: LOAD_SPOTS,
        payload: snapshot.val()
      })
    });
  }
}

export function insertSpot(spot, success) {
  return dispatch => {
    success();
    firebase.child('spots').push(spot);
  };
}

export function updateSpots(spots) {
  return dispatch => firebase.child('spots').update(spots);
}

export function getRandomUserSpot(spots, filterDays, currentUser, emptySpotsCallback) {
  const randomSpot = _getRandomSpot(spots, filterDays, currentUser, emptySpotsCallback);
  return {
    type: GET_RANDOM_SPOT,
    payload: randomSpot
  };
}

/* Util methods */
const _getRandomSpot = (spots, filterDays, currentUser, emptySpotsCallback) => {
  console.log(filterDays);
  const avaibleSpots = _.filter(spots, spot => {
    let isAvaible = false;

    if (spot.userId === currentUser.id) {
      /* Checks if spot days exists in filter days */
      isAvaible = _.some(spot.selectedDays, (spotDay, spotDayId) => {
        if (spotDay) {
          return _.some(filterDays, (filterDay, filterDayId) => filterDayId.toString() === spotDayId.toString());
        } else {
          return false;
        }
      });
    }

    return isAvaible;
  });

  let spot;
  if (avaibleSpots.length) {
    const randomPosition = getRandomInt(0, avaibleSpots.length - 1);
    spot = avaibleSpots[randomPosition];
  } else {
    emptySpotsCallback();
    spot = null;
  }

  return spot;
};
