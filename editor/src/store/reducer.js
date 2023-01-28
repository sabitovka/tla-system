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
    case actions.ORDERS_ALL_FETCHED: {
      return { ...state, allOrders: action.payload.orders }
    }
    case actions.ORDER_ADD: {
      const ordersQueue = state.ordersQueue.concat(action.payload);
      return { ...state, ordersQueue }
    }
    case actions.ORDER_REMOVE: {
        const ordersQueue = state.ordersQueue.filter(
            (item) => !(item.id === action.payload.id 
                && item.loadingId === action.payload.loadingId))

        return { ...state, ordersQueue }
    }
    case actions.PRODUCT_ADD: {
        const productsQueue = state.productsQueue.concat(action.payload);
        const totalCost = state.totalCost + action.payload.total;
        const totalWeight = state.totalWeight + action.payload.totalWeight;
        const totalVolume = state.totalVolume + action.payload.totalVolume;
        return { ...state, productsQueue, totalCost, totalVolume, totalWeight }
    }
    case actions.PRODUCT_DELETE: {
        const productsQueue = state.productsQueue.filter(
            (item) => !(item.productId === action.payload.productId 
                && item.orderId === action.payload.orderId))

        const totalCost = state.totalCost - action.payload.total;
        const totalWeight = state.totalWeight - action.payload.totalWeight;
        const totalVolume = state.totalVolume - action.payload.totalVolume;
        return { ...state, productsQueue, totalCost, totalWeight, totalVolume }
    }
    case actions.COST_SET: {
      const totalCost = state.totalCost + action.payload.value;
      return { ...state, totalCost }
    }
    case actions.VOLUME_SET: {
      const totalVolume = state.totalVolume + action.payload.value;
      return { ...state, totalVolume }
    }
    case actions.WEIGHT_SET: {
      const totalWeight = state.totalWeight + action.payload.value;
      return { ...state, totalWeight }
    }
    default:
      return state;
  }
}