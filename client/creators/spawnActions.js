import {SET_RATE} from  '../constants/Spawn';

export function setRate(rate) {
  return {type: SET_RATE, payload: rate};
}
