import { SLOW, NORMAL, FAST } from '../constants/Speed';

export function slow () {
  return {type: SLOW};
}

export function normal () {
  return {type: NORMAL};
}

export function fast () {
  return {type: FAST};
}
