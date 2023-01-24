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