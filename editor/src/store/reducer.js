import * as actions from './actionTypes';
import initialState from './inititalState';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ERROR_ADD:
      state.errors.push(action.payload)
      return state;
    case actions.ERROR_DELETE:
      state.errors = state.errors.filter((item) => item.errorNumber !== action.payload);
      return state;
    default:
      return state;
  }
}