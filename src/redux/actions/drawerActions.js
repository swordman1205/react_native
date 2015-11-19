import {ActionTypes} from '../../constants';

export function setDrawerBackground(color) {
  const {SET_DRAWER_BACKGROUND} = ActionTypes;
  return {
    type: SET_DRAWER_BACKGROUND,
    result: color
  };
}

export function setDrawerOpen(state) {
  const {DRAWER_OPEN, DRAWER_CLOSE} = ActionTypes;
  return {
    type: (state ? DRAWER_OPEN : DRAWER_CLOSE),
    result: {}
  };
}