import { SET_USER } from '../actions';

export default (state = null, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
};