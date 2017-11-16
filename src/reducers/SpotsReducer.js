import { LOAD_SPOTS } from '../actions';

export default (state = [], action) => {
  switch(action.type) {
    case LOAD_SPOTS:
      return action.payload;
    default:
      return state;
  }
};