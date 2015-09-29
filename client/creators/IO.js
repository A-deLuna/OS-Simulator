import { SET_IO_LIMIT, IO_TICK, RESTART_IO } from '../constants/IO';

export function tickIO() {
  return {type: IO_TICK};
}

export function setIOLimit(limit) {
  return {type: SET_IO_LIMIT, payload:{ limit: limit }};
}

export function restartIO() {
  return {type: RESTART_IO};
}
