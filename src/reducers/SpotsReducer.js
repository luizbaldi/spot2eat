import { LOAD_SPOTS } from '../actions/SpotsActions';

export default (state = [], action) => {
  switch(action.type) {
    case LOAD_SPOTS:
      return action.payload;
    default:
      return state;
  }
};