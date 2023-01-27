import * as actions from './actionTypes';
import initialState from './inititalState';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ERROR_ADD: {
      const errors = state.errors.concat(action.payload);
      return { ...state, errors };
    }
    case actions.ERROR_DELETE: {
      const errors = state.errors.filter((item) => item.errorNumber !== action.payload);
      return { ...state, errors };
    }
    case actions.LOADING_FETCHED: {
      const { transport, orders: rawOrders } = action.payload;
      delete action.payload.transport;
      delete action.payload.orders;
 
      return { ...state, loading: action.payload, transport, rawOrders };
    }
    case actions.ORDER_FETCHED: {
      const orders = state.orders.concat({ ...action.payload });
      return { ...state, orders};
    }
    case actions.PRODUCT_ADD: {
        const productsQueue = state.productsQueue.concat(action.payload);
        return { ...state, productsQueue }
    }
    case actions.PRODUCT_DELETE: {
        const productsQueue = state.productsQueue.filter(
            (item) => !(item.productId === action.payload.productId 
                && item.orderId === action.payload.orderId))
        return { ...state, productsQueue }
    }
    default:
      return state;
  }
}