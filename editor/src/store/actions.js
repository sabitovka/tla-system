import * as actions from './actionTypes';

let errorNumber = 0;

export const addError = (header = 'Произошла ошибка', text = '') => ({
  type: actions.ERROR_ADD,
  payload: { header, text, errorNumber: errorNumber++ },
})

export const deleteError = (num) => ({
  type: actions.ERROR_DELETE,
  payload: num
})

export const onLoadingFetched = ({ id, creationDate, transport, isLoaded, orders }) => ({
  type: actions.LOADING_FETCHED,
  payload: { id, creationDate, transport, isLoaded, orders }
})

export const fetchOrder = (fetched) => ({
  type: actions.ORDER_FETCHED,
  payload: { ...fetched }
})

export const addProduct = (product, orderId, action) => ({
    type: actions.PRODUCT_ADD,
    payload: { ...product, orderId, action },
})

export const deleteProduct = (product, orderId,) => ({
    type: actions.PRODUCT_DELETE,
    payload: { ...product, orderId },
})

export const setCost = (value) => ({
  type: actions.COST_SET,
  payload: { value }
})

export const setVolume = (value) => ({
  type: actions.VOLUME_SET,
  payload: { value }
})

export const setWeight = (value) => ({
  type: actions.WEIGHT_SET,
  payload: { value }
})

export const fetchAllOrder = (orders) => ({
  type: actions.ORDERS_ALL_FETCHED,
  payload: { orders }
})

export const addOrder = ({ id }, loadingId, action) => ({
  type: actions.ORDER_ADD,
  payload: { id, loadingId, action }
})

export const removeOrder = ({ id }, loadingId) => ({
  type: actions.ORDER_REMOVE,
  payload: { id, loadingId }
})