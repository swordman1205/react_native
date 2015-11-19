import {ActionTypes} from '../../constants';

export function withdraw(amount) {
  const {WITHDRAW_REQUESTED, WITHDRAW_SUCCESS, WITHDRAW_ERROR} = ActionTypes;
  return {
    types: [WITHDRAW_REQUESTED, WITHDRAW_SUCCESS, WITHDRAW_ERROR],
    promise: request.post({email, password}).promise()
  };
}