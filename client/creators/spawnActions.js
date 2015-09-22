import {SET_RATE, SPAWN_PROCESS_NEW, MOVE_NEW_TO_READY, TAKE_ONE_READY_TO_RUNNING} from  '../constants/Spawn';

export function setRate(rate) {
  return {type: SET_RATE, payload: rate};
}

let id = 1;
export function spawnProcessNew(arrivalTime, CPUTime, IOTime) {
  return {
    type: SPAWN_PROCESS_NEW,
    payload: {
      id: 'P' + (id++),
      arrivalTime: arrivalTime,
      CPUTime: CPUTime,
      IOTime: IOTime
    }
  };
}

export function moveNewToReady() {
  return {type: MOVE_NEW_TO_READY};
}

export function takeOneReadyToRunning() {
  return {type: TAKE_ONE_READY_TO_RUNNING};
}
