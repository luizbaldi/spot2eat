import { combineReducers } from 'redux';
import CurrentSpotReducer from './CurrentSpotReducer'; 
import UserReducer from './UserReducer';
import SpotsReducer from './SpotsReducer';

const rootReducer = combineReducers({
    currentSpot: CurrentSpotReducer,
    user: UserReducer,
    spots: SpotsReducer
});

export default rootReducer;