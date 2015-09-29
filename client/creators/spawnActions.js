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

export function moveRunningToReady() {
  return {type: ProcessConstants.MOVE_RUNNING_TO_READY};
}

export function moveRunningToWaiting() {
  return {type: ProcessConstants.MOVE_RUNNING_TO_WAITING};
}

export function takeOneWaitingToUsingIO() {
  return {type: ProcessConstants.TAKE_ONE_WAITING_TO_USINGIO};
}

export function moveUsingIOToReady() {
  return {type: ProcessConstants.MOVE_USINGIO_TO_READY};
}
