import { createReducer } from 'utils';
import { SPAWN_PROCESS_NEW } from '../constants/Spawn';
const initialState = {
  newProcesses: [],
  readyProcesses: [],
  runningProcess: {},
  waitingIOProcesses: [],
  usingIOProcess: {},
  finishedProcesses: []
};

export default createReducer(initialState, {
  [SPAWN_PROCESS_NEW] : (state, payload) => {
    return Object.assign({}, initialState,
      {
        newProcesses: [...state.newProcesses,
         {id: payload.id,
           arrivalTime: payload.arrivalTime,
           CPUTime: payload.CPUTime,
           IOTime: payload.IOTime}]
      });
  }
});
