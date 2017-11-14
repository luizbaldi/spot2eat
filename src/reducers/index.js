import { combineReducers } from 'redux';
import SpotsReducer from './SpotsReducer';

const rootReducer = combineReducers({
    currentSpot: SpotsReducer
});

export default rootReducer;