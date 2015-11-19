import {ActionTypes} from '../../constants';
const {SET_DRAWER_BACKGROUND, DRAWER_OPEN, DRAWER_CLOSE} = ActionTypes;
var initialState = {backgroundColor: 'transparent', isOpen: false};

export default function drawer(state = initialState, action) {

	switch(action.type) {
		case SET_DRAWER_BACKGROUND:
			return {
				...state,
				backgroundColor: action.result
			};
		case DRAWER_OPEN:
			return {
				...state,
				isOpen: true
			};
		case DRAWER_CLOSE:
			return {
				...state,
				isOpen: false
			};
		default: 
			return state;
	}
	return state;
}
