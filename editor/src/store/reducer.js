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
    case actions.LOADING_FETCHED:
      const { transport, orders: ordersRaw } = action.payload;
      delete action.payload.transport;
      delete action.payload.orders;

      const orders = {};
      for (const order of ordersRaw) {
        orders[order.orderId] = null;
      }
 
      return { ...state, loading: action.payload, transport, orders };
    case actions.ORDER_FETCHED:
      state.orders[action.payload.id] = action.payload;
      return state;
    default:
      return state;
  }
}