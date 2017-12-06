import { combineReducers } from 'redux';
import CurrentSpotReducer from './CurrentSpotReducer'; 
import UserReducer from './UserReducer';
import SpotsReducer from './SpotsReducer';
import FilterDaysReducer from './FilterDaysReducer';

const rootReducer = combineReducers({
    currentSpot: CurrentSpotReducer,
    user: UserReducer,
    spots: SpotsReducer,
    filterDays: FilterDaysReducer
});

export default rootReducer;