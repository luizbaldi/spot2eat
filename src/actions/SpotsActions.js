import firebase from '../util/fire';
import _ from 'lodash';
import { getRandomInt } from '../util/util';

/* Action Types */
export const GET_RANDOM_SPOT = 'GET_RANDOM_SPOT';
export const LOAD_SPOTS      = 'LOAD_SPOTS';
export const INSERT_SPOT     = 'INSERT_SPOT';

/* Action Creators */
export function loadSpots(currentUser) {
    /* Old spots url: https://api.myjson.com/bins/t7mlr */

    return dispatch => {
        firebase.on('value', snapshot => {
            dispatch({
                type: LOAD_SPOTS,
                payload: snapshot.val()
            })
        });
    }
}

export function insertSpot(spot, success) {
    return dispatch => {
        success()
        firebase.push(spot)
    };
}

export function updateSpots(spots) {
    return dispatch => firebase.update(spots);
}

export function getRandomUserSpot(spots, currentUser, emptySpotsCallback) {
    const randomSpot = _getRandomSpot(spots, currentUser, emptySpotsCallback);
    return {
        type: GET_RANDOM_SPOT,
        payload: randomSpot
    };
}

/* Util methods */
const _getRandomSpot = (spots, currentUser, emptySpotsCallback) => {
    const avaibleSpots = _.filter(spots, spot => spot.userId === currentUser.id);

    let spot;
    if (avaibleSpots.length) {
        spot = avaibleSpots[getRandomInt(0, avaibleSpots.length - 1)];
    } else {
        emptySpotsCallback();
        spot = null;
    }

    return spot;
};