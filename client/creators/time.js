import { TICK, PAUSE, RESUME, RESTART } from '../constants/Time';

export function timeTick() {
  return { type: TICK };
}

export function pause() {
  return {type: PAUSE};
}

export function resume() {
  return {type: RESUME };
}

export function restart() {
  return {type: RESTART };
}
