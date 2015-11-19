import {ActionTypes} from '../../constants';

export function setCurrency(currency) {
  const {SET_CURRENCY} = ActionTypes;
  return {
    type: SET_CURRENCY,
    result: currency
  };
}