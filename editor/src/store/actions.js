import * as actions from './actionTypes';

export const addError = (header = 'Произошла ошибка', text = '') => ({
  type: actions.ERROR_ADD,
  payload: { header, text },
})