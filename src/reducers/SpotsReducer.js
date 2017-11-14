import { GENERATE_SPOT } from '../actions';

export default function(state = null, action) {
    switch (action.type) {
        case GENERATE_SPOT:
            return action.payload;
        default:
            return state;
    }
};