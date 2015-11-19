import {AsyncStorage} from 'react-native';

import {ActionTypes} from '../../constants';

const {TRANSACTIONS_REQUESTED, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILED, TRANSACTION_DETAIL_REQUESTED, TRANSACTION_DETAIL_SUCCESS, TRANSACTION_DETAIL_FAILED} = ActionTypes;
var initialState = {list: null, transaction_detail: null, loading: false, error: null, detail_loading: false};

export default function transactions(state = initialState, action) {
	switch(action.type) {
		case TRANSACTIONS_REQUESTED:
			return {
				...state,
				loading: true,
				list: null,
				error: null
			};
		case TRANSACTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				[action.result.body.ResponseCode == 1 ? 'list' : 'error']: action.result.body
			};
		case TRANSACTIONS_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case TRANSACTION_DETAIL_REQUESTED:
			return {
				...state,
				detail_loading: true,
				detail: null,
				error: null
			};
		case TRANSACTION_DETAIL_SUCCESS:
			return {
				...state,
				detail_loading: false,
				[action.result.body.ResponseCode == 1 ? 'detail' : 'error']: action.result.body
			};
		case TRANSACTION_DETAIL_FAILED:
			return {
				...state,
				detail_loading: false,
				error: action.result
			};
		default: 
			return state;
	}
	return state;
}