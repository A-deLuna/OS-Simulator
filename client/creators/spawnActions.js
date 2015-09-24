import * as ProcessConstants from '../constants/Spawn';

export function setRate(rate) {
  return {type: ProcessConstants.SET_RATE, payload: rate};
}

let id = 1;
export function spawnProcessNew(arrivalTime, CPUTime, IOTime) {
  return {
    type: ProcessConstants.SPAWN_PROCESS_NEW,
    payload: {
      id: (id++),
      arrivalTime: arrivalTime,
      CPUTime: CPUTime,
      IOTime: IOTime
    }
  };
}

export function moveNewToReady() {
  return {type: ProcessConstants.MOVE_NEW_TO_READY};
}

export function takeOneReadyToRunning() {
  return {type: ProcessConstants.TAKE_ONE_READY_TO_RUNNING};
}

export function tickRunningProcess() {
  return {type: ProcessConstants.TICK_RUNNING_PROCESS};
}

export function moveRunningToFinished() {
  return {type: ProcessConstants.MOVE_RUNNING_TO_FINISHED};
}
