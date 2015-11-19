import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';

const {TRANSACTIONS_REQUESTED, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILED, TRANSACTION_DETAIL_REQUESTED, TRANSACTION_DETAIL_SUCCESS, TRANSACTION_DETAIL_FAILED} = ActionTypes;

export function loadTransactions(token, mobileAccountId, fromDate, toDate) {
  const {languageCode, deviceId} = API_Config;
	return {
    types: [TRANSACTIONS_REQUESTED, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILED],
    promise: request.post(API_Config.baseUrl + '/Transaction/Transactions')
      .send({ MobileAccountId: mobileAccountId, FromDate: fromDate, ToDate: toDate, LanguageCode: languageCode, deviceid: deviceId })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .set('Cookie', `MobileSessionToken=${token};`)
      .withCredentials()
      .promise()
	};
}

export function loadTransactionDetails(token, mobileAccountId, transactionId) {
  const {languageCode, deviceId} = API_Config;
  return {
    types: [TRANSACTION_DETAIL_REQUESTED, TRANSACTION_DETAIL_SUCCESS, TRANSACTION_DETAIL_FAILED],
    promise: request.post(API_Config.baseUrl + '/Transaction/TransactionDetails')
      .send({ MobileAccountId: mobileAccountId, TransactionId: transactionId, LanguageCode: languageCode, deviceid: deviceId })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .set('Cookie', `MobileSessionToken=${token};`)
      .withCredentials()
      .promise()
  };
}