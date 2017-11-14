import { combineReducers } from 'redux';
import SpotsReducer from './SpotsReducer';

const rootReducer = combineReducers({
    spot: SpotsReducer
});

export default rootReducer;