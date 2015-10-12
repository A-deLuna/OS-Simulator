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

export function moveNewToReady(count) {
  return {type: ProcessConstants.MOVE_NEW_TO_READY, payload: {
    size: count
  }};
}

export function takeOneReadyToRunning() {
  return {type: ProcessConstants.TAKE_ONE_READY_TO_RUNNING};
}

export function tickRunningProcess() {
  return {type: ProcessConstants.TICK_RUNNING_PROCESS};
}

export function moveRunningToFinished(time) {
  return {type: ProcessConstants.MOVE_RUNNING_TO_FINISHED, payload: {time: time}};
}

export function moveRunningToReady() {
  return {type: ProcessConstants.MOVE_RUNNING_TO_READY};
}

export function moveRunningToWaiting() {
  return {type: ProcessConstants.MOVE_RUNNING_TO_WAITING};
}

export function takeOneWaitingToUsingIO(goalTime) {
  return {type: ProcessConstants.TAKE_ONE_WAITING_TO_USINGIO, payload: {goalTime: goalTime}};
}

export function moveUsingIOToReady() {
  return {type: ProcessConstants.MOVE_USINGIO_TO_READY};
}

export function setNewListLimit (limit) {
  return {type: ProcessConstants.NEW_LIST_LIMIT, payload: { limit: limit }};
}

export function setReadyListLimit (limit) {
  return {type: ProcessConstants.READY_LIST_LIMIT, payload: { limit: limit }};
}
export function setWaitingListLimit (limit) {
  return {type: ProcessConstants.WAITING_LIST_LIMIT, payload: { limit: limit }};
}

