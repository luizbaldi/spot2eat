import { GENERATE_SPOT } from '../actions';

export default (state = null, action) => {
    switch (action.type) {
        case GENERATE_SPOT:
            return action.payload;
        default:
            return state;
    }
};