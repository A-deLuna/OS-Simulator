import { createReducer } from 'utils';
import * as ProcessConstants from '../constants/Spawn';
const initialState = {
  newProcesses: [],
  readyProcesses: [],
  runningProcess: {},
  waitingIOProcesses: [],
  usingIOProcess: {},
  finishedProcesses: []
};

export default createReducer(initialState, {
  [ProcessConstants.SPAWN_PROCESS_NEW] : (state, payload) => {
    return Object.assign({}, state,
      {
        newProcesses: [...state.newProcesses,
         {id: payload.id,
           arrivalTime: payload.arrivalTime,
           currentCPUTime: 0,
           totalCPUTime: payload.CPUTime,
           IOTime: payload.IOTime}]
      });
  },

  [ProcessConstants.MOVE_NEW_TO_READY] : (state) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses,
          ...state.newProcesses]},
          {newProcesses: []});
  },

  [ProcessConstants.TAKE_ONE_READY_TO_RUNNING] : (state) => {
    return Object.assign({}, state, {
      runningProcess: state.readyProcesses[0] ? state.readyProcesses[0] : {},
      readyProcesses: [...state.readyProcesses.slice(1)]});
  },

  [ProcessConstants.TICK_RUNNING_PROCESS] : (state) => {
    return Object.assign({}, state, {
      runningProcess: Object.assign({}, state.runningProcess, {
        currentCPUTime: state.runningProcess.currentCPUTime + 1
      })
    });
  },

  [ProcessConstants.MOVE_RUNNING_TO_FINISHED] : (state) => {
    return Object.assign({}, state, {
      finishedProcesses: [...state.finishedProcesses, state.runningProcess],
      runningProcess: {}
    });
  },

  [ProcessConstants.MOVE_RUNNING_TO_READY]: (state) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses, state.runningProcess],
      runningProcess: {}
    });
  },

  [ProcessConstants.MOVE_RUNNING_TO_WAITING]: (state) => {
    return Object.assign({}, state, {
      waitingIOProcesses: [...state.waitingIOProcesses, state.runningProcess],
      runningProcess: {}
    });
  },

  [ProcessConstants.TAKE_ONE_WAITING_TO_USINGIO]: (state) => {
    return Object.assign({}, state, {
      usingIOProcess: state.waitingIOProcesses[0] ? state.waitingIOProcesses[0] : {},
      waitingIOProcesses: [...state.waitingIOProcesses.slice(1)]
    });
  },

  [ProcessConstants.MOVE_USINGIO_TO_READY]: (state) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses, state.usingIOProcess],
      usingIOProcess: {}
    });
  }
});
