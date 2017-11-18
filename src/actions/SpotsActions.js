import axios from 'axios';
import { getRandomInt } from '../util/util';
/* Action Types */
export const GENERATE_SPOT = 'GENERATE_SPOT';
export const LOAD_SPOTS    = 'LOAD_SPOTS';

/* Action Creators */
export function generateSpot(currentUser) {
    const spotsUrl = 'https://api.myjson.com/bins/t7mlr';
    return {
        type: GENERATE_SPOT,
        payload: _requestSpot(spotsUrl, currentUser)
    };
};

export function loadSpots(currentUser) {
    const spotsUrl = 'https://api.myjson.com/bins/t7mlr';
    return {
        type: LOAD_SPOTS,
        payload: _loadSpots(spotsUrl, currentUser)
    }
}

/* Util methods */
const _requestSpot = (spotsUrl, currentUser) => {
    return axios.get(spotsUrl)
        .then(({ data }) => {
            let spot = null;
            const avaibleSpots = data.filter(spot => spot.userId === currentUser.id);

            if (avaibleSpots.length) {
                spot = avaibleSpots[getRandomInt(0, avaibleSpots.length - 1)];
            } else {
                spot = avaibleSpots;
            }

            return spot;
        })
        .catch(err => {
            return null;
        });
};

const _loadSpots = (spotsUrl, currentUser) => {
  return axios.get(spotsUrl)
        .then(({ data }) => currentUser ? data.filter(spot => spot.userId === currentUser.id) : [])
        .catch(err => {
            console.log('Error loading spots', err);
            return [];
        });
};