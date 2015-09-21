import {SET_RATE, SPAWN_PROCESS_NEW} from  '../constants/Spawn';

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
