import { combineReducers } from 'redux';
import SpotsReducer from './SpotsReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    currentSpot: SpotsReducer,
    user: UserReducer
});

export default rootReducer;