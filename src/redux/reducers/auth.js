import {AsyncStorage} from 'react-native';

import {LOCAL_STORAGE_TOKEN_KEY, ActionTypes} from '../../constants';
const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} = ActionTypes;
var initialState = {user: null, loading: false, error: null};

export default function auth(state = initialState, action) {

	switch(action.type) {
		case LOGIN_REQUESTED:
			return {
				...state,
				loading: true,
				user: null,
				error: null
			};
		case LOGIN_SUCCESS:
			if (action.result.body.ResponseCode == 1) {
				AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(action.result.body)).done();	
			}
			return {
				...state,
				loading: false,
				[action.result.body.ResponseCode == 1 ? 'user' : 'error']: action.result.body
			};
		case LOGIN_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case LOGOUT:
			AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY).done();
			return {
				...state,
				user: null
			};
		default: 
			return state;
	}
	return state;
}
