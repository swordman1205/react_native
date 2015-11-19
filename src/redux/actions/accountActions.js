import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';

const {ACCOUNT_REQUESTED, ACCOUNT_SUCCESS, ACCOUNT_FAILED} = ActionTypes;

export function loadAccountInfo(token) {
  const {deviceId} = API_Config;
	return {
    types: [ACCOUNT_REQUESTED, ACCOUNT_SUCCESS, ACCOUNT_FAILED],
    promise: request.post(API_Config.baseUrl + '/Account/Account')
      .send({ deviceid: deviceId })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .set('Cookie', `MobileSessionToken=${token};`)
      .withCredentials()
      .promise()
	};
}