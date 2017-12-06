import { SET_FILTER } from '../actions/FilterDaysActions';

export default (state = {}, action) => {
  switch(action.type) {
    case SET_FILTER:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};