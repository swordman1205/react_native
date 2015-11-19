import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';

const {PAYMENTS_REQUESTED, PAYMENTS_SUCCESS, PAYMENTS_FAILED, PAYMENT_DETAIL_REQUESTED, PAYMENT_DETAIL_SUCCESS, PAYMENT_DETAIL_FAILED} = ActionTypes;

export function loadPayments(token, mobileAccountId, fromDate, toDate) {
  const {languageCode, deviceId} = API_Config;
  return {
    types: [PAYMENTS_REQUESTED, PAYMENTS_SUCCESS, PAYMENTS_FAILED],
    promise: request.post(API_Config.baseUrl + '/Payment/Payments')
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

export function loadPaymentDetails(token, mobileAccountId, paymentId) {
  const {languageCode, deviceId} = API_Config;
  return {
    types: [PAYMENT_DETAIL_REQUESTED, PAYMENT_DETAIL_SUCCESS, PAYMENT_DETAIL_FAILED],
    promise: request.post(API_Config.baseUrl + '/Payment/PaymentDetails')
      .send({ MobileAccountId: mobileAccountId, PaymentId: paymentId, LanguageCode: languageCode, deviceid: deviceId })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .set('Cookie', `MobileSessionToken=${token};`)
      .withCredentials()
      .promise()
  };
}