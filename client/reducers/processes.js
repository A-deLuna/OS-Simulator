import { createReducer } from 'utils';
import { SPAWN_PROCESS_NEW, MOVE_NEW_TO_READY, TAKE_ONE_READY_TO_RUNNING} from '../constants/Spawn';
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
    return Object.assign({}, state,
      {
        newProcesses: [...state.newProcesses,
         {id: payload.id,
           arrivalTime: payload.arrivalTime,
           CPUTime: payload.CPUTime,
           IOTime: payload.IOTime}]
      });
  },

  [MOVE_NEW_TO_READY] : (state) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses,
          ...state.newProcesses]},
          {newProcesses: []});
  },

  [TAKE_ONE_READY_TO_RUNNING] : (state) => {
    return Object.assign({}, state, {
      runningProcess: state.readyProcesses[0] ? state.readyProcesses[0] : {},
      readyProcesses: [...state.readyProcesses.slice(1)]});
  }
});
