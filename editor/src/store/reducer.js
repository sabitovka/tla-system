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
    case actions.LOADING_FETCHED: {
      const { transport, orders: rawOrders } = action.payload;
      delete action.payload.transport;
      delete action.payload.orders;
 
      return { ...state, loading: action.payload, transport, rawOrders };
    }
    case actions.ORDER_FETCHED: {
      const orders = state.orders.concat({ ...action.payload, orderId: action.payload.id});
      return { ...state, orders};
    }
    default:
      return state;
  }
}