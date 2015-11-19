import {ActionTypes} from '../../constants';

export function setCurrentRoute(route) {
  const {SET_CURRENT_ROUTE} = ActionTypes;
  return {
    type: SET_CURRENT_ROUTE,
    result: route
  };
}

export function setHeaderTitle(title) {
  const {SET_HEADER_TITLE} = ActionTypes;
  return {
    type: SET_HEADER_TITLE,
    result: title
  };
}
