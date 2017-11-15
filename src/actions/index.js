import axios from 'axios';

/* Action Types */
export const GENERATE_SPOT = 'GENERATE_SPOT';

/* Action Creators */
export function generateSpot() {
    const spotsUrl = 'https://api.myjson.com/bins/t7mlr';
    return {
        type: GENERATE_SPOT,
        payload: _requestSpot(spotsUrl)
    };
};

/* Util methods (@toDo: Separate them in another file) */
const _requestSpot = (spotsUrl) => {
    return axios.get(spotsUrl)
        .then(({ data }) => {
            let spot = null;
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const avaibleSpots = data.filter(spot => spot.userId === currentUser.id);

            if (avaibleSpots.length) {
                spot = avaibleSpots[_getRandomInt(0, avaibleSpots.length - 1)];
            } else {
                spot = avaibleSpots;
            }

            return spot;
        })
        .catch(err => {
            return null;
        });
};

const _getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}