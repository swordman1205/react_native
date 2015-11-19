import {AsyncStorage} from 'react-native';

import {ActionTypes} from '../../constants';
const {SET_CURRENCY} = ActionTypes;
var initialState = {currency: 'USD'};

export default function currency(state = initialState, action) {

	switch(action.type) {
		case SET_CURRENCY:
			return {
				...state,
				currency: action.result
			};
		default: 
			return state;
	}
	return state;
}
