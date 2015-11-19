import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
/* ... */

export function loginWithUsernamePassword(username, password) {
  const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED} = ActionTypes;
  const {appVersion, mobileAppId, languageCode, deviceProperties, deviceId} = API_Config;
	return {
    types: [LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED],
    promise: request.post(API_Config.baseUrl + '/User/Login')
      .send({ appversion: appVersion, MobileAppId: mobileAppId, languageCode: languageCode, Timestamp: null, username, password, DeviceProperties: deviceProperties, deviceid: deviceId })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .promise()
	};
}

export function loginWithUserCache(user) {
  const {LOGIN_SUCCESS} = ActionTypes;
  return {
    type: LOGIN_SUCCESS,
    result: {body: user}
  };
}

export function logout() {
  const {LOGOUT} = ActionTypes;
  return {
    type: LOGOUT,
    result: {}
  };
}


