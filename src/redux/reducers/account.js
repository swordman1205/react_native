import {AsyncStorage} from 'react-native';

import {ActionTypes} from '../../constants';

const {ACCOUNT_REQUESTED, ACCOUNT_SUCCESS, ACCOUNT_FAILED} = ActionTypes;
var initialState = {account: null, loading: false, error: null};

export default function account(state = initialState, action) {
	switch(action.type) {
		case ACCOUNT_REQUESTED:
			return {
				...state,
				loading: true,
				account: null,
				error: null
			};
		case ACCOUNT_SUCCESS:
			return {
				...state,
				loading: false,
				[action.result.body.ResponseCode == 1 ? 'account' : 'error']: action.result.body
			};
		case ACCOUNT_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		default: 
			return state;
	}
	return state;
}