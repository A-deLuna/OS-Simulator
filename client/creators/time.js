import { TICK, PAUSE, RESUME } from '../constants/Time';

export function timeTick() {
  return { type: TICK };
}

export function pause() {
  return {type: PAUSE};
}

export function resume() {
  return {type: RESUME };
}
