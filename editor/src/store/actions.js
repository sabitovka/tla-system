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

export const fetchOrder = (fetched, additionalId) => ({
  type: actions.ORDER_FETCHED,
  payload: { ...fetched, additionalId }
})

export const addProduct = ({ id: productId }, additionalId, action) => ({
    type: actions.PRODUCT_ADD,
    payload: { productId, additionalId, action },
})

export const deleteProduct = ({ id: productId }, additionalId,) => ({
    type: actions.PRODUCT_DELETE,
    payload: { productId, additionalId },
})