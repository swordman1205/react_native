import {ActionTypes} from '../../constants';
import {Actions} from 'react-native-router-flux';

const {SET_CURRENT_ROUTE, SET_HEADER_TITLE} = ActionTypes;
var initialState = {currentRoute: '', headerTitle: ''};

export default function global(state = initialState, action) {

	switch(action.type) {
		case Actions.AFTER_ROUTE:
		case Actions.AFTER_POP:
		case Actions.AFTER_DISMISS:
			console.log(action);
			return {
				...state,
				currentRoute: action.name
			};
		case SET_CURRENT_ROUTE:
			return {
				...state,
				currentRoute: action.result
			};
		case SET_HEADER_TITLE:
			return {
				...state,
				headerTitle: action.result
			};
		default: 
			return state;
	}
	return state;
}