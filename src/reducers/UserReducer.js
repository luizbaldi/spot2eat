import { SET_USER } from '../actions/UserActions';

export default (state = null, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
};