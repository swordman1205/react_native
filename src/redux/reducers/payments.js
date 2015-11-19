import {AsyncStorage} from 'react-native';

import {ActionTypes} from '../../constants';

const {PAYMENTS_REQUESTED, PAYMENTS_SUCCESS, PAYMENTS_FAILED, PAYMENT_DETAIL_REQUESTED, PAYMENT_DETAIL_SUCCESS, PAYMENT_DETAIL_FAILED} = ActionTypes;
var initialState = {list: null, payment_detail: null, loading: false, error: null, detail_loading: false};

export default function payments(state = initialState, action) {
	switch(action.type) {
		case PAYMENTS_REQUESTED:
			return {
				...state,
				loading: true,
				list: null,
				error: null
			};
		case PAYMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				[action.result.body.ResponseCode == 1 ? 'list' : 'error']: action.result.body
			};
		case PAYMENTS_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case PAYMENT_DETAIL_REQUESTED:
			return {
				...state,
				detail_loading: true,
				detail: null,
				error: null
			};
		case PAYMENT_DETAIL_SUCCESS:
			return {
				...state,
				detail_loading: false,
				[action.result.body.ResponseCode == 1 ? 'detail' : 'error']: action.result.body
			};
		case PAYMENT_DETAIL_FAILED:
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