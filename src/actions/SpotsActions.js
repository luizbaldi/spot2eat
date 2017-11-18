import axios from 'axios';
import firebase from '../util/fire';

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

export function insertSpot(spot) {
    return dispatch => firebase.push(spot);
}

export function getRandomUserSpot(spots, currentUser) {
    return {
        type: GET_RANDOM_SPOT,
        payload: _getRandomSpot(spots, currentUser)
    };
}

/* Util methods */
const _getRandomSpot = (spots, currentUser) => {
    let spot = null;
    const avaibleSpots = spots.filter(spot => spot.userId === currentUser.id);

    if (avaibleSpots.length) {
        spot = avaibleSpots[getRandomInt(0, avaibleSpots.length - 1)];
    } else {
        spot = avaibleSpots;
    }

    return spot;
};

const _loadSpots = (spotsUrl, currentUser) => {
  return axios.get(spotsUrl)
        .then(({ data }) => currentUser ? data.filter(spot => spot.userId === currentUser.id) : [])
        .catch(err => {
            console.log('Error loading spots', err);
            return [];
        });
};