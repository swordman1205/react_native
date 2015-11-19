import {AsyncStorage} from 'react-native';

import {ActionTypes} from '../../constants';
var initialState = {
	cards : [
		{
			type: 'virtual_balance',
			balance: '3445',
			card_no: "XXXX-2592",
			unit: "USD",
		},
		{
			type: 'virtual_balance',
			balance: '34534',
			card_no: "XXXX-6564",
			unit: "USD",
		},
		{
			type: 'bank_card',
			balance: '2543',
			card_no: "XXXX-3452",
			unit: "USD",
		},
		{
			type: 'bank_card',
			balance: '23453',
			card_no: "XXXX-6734",
			unit: "USD",
		},
		{
			type: 'debit_card',
			balance: '4534',
			card_no: "XXXX-1456",
			unit: "USD",
		},
		{
			type: 'bank_card',
			balance: '4525',
			card_no: "XXXX-2347",
			unit: "USD",
		},
		{
			type: 'debit_card',
			balance: '67455',
			card_no: "XXXX-8754",
			unit: "USD",
		}
	]
};

export default function card(state = initialState, action) {

	switch(action.type) {
		default: 
			return state;
	}
	return state;
}
