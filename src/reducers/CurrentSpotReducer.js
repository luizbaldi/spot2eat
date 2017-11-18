import { GET_RANDOM_SPOT } from '../actions/SpotsActions';

export default (state = null, action) => {
    switch (action.type) {
        case GET_RANDOM_SPOT:
            return action.payload;
        default:
            return state;
    }
};