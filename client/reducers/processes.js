import { createReducer } from 'utils';
import * as ProcessConstants from '../constants/Spawn';
import * as MemoryConstants from '../constants/Memory';


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialState = {
  newProcesses: [],
  readyProcesses: [],
  runningProcess: {},
  waitingIOProcesses: [],
  usingIOProcess: {},
  finishedProcesses: [],
  errorProcesses: [],
  newListLimit: 20,
  readyListLimit: 20,
  waitingListLimit: 20,
  frameLoaded: 0
};

export default createReducer(initialState, {
  [ProcessConstants.SPAWN_PROCESS_NEW] : (state, payload) => {
    return Object.assign({}, state, {
      newProcesses: [...state.newProcesses, {
        id: payload.id,
        arrivalTime: payload.arrivalTime,
        currentCPUTime: 0,
        totalCPUTime: payload.CPUTime,
        IOTime: payload.IOTime,
        IOGoalTime: 0,
        finishedTime: 0,
        IOUsed: false,
        memory: payload.memory,
        frameList: Array.apply(null, Array(payload.pages)).map(function() { return MemoryConstants.DISK; }),
        frameLoaded: 0,
        needsDisk: false
      }]
    });
  },

  [ProcessConstants.MOVE_NEW_TO_READY] : (state, payload) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses,
          ...state.newProcesses.slice(0, payload.size)]},
          {newProcesses: [...state.newProcesses.slice(payload.size)]});
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

  [ProcessConstants.MOVE_RUNNING_TO_FINISHED] : (state, payload) => {
    return Object.assign({}, state, {
      finishedProcesses: [...state.finishedProcesses, Object.assign({}, state.runningProcess, {
        finishedTime: payload.time
      })],
      runningProcess: {}
    });
  },

  [ProcessConstants.MOVE_RUNNING_TO_READY]: (state) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses, state.runningProcess],
      runningProcess: {}
    });
  },

  [ProcessConstants.MOVE_RUNNING_TO_ERROR]: (state) => {
    return Object.assign({}, state, {
      errorProcesses: [...state.errorProcesses,
      Object.assign({}, state.runningProcess, { currentCPUTime: 'ERROR' })],
      runningProcess: {}
    });
  },

  [ProcessConstants.MOVE_RUNNING_TO_WAITING]: (state) => {
    return Object.assign({}, state, {
      waitingIOProcesses: [...state.waitingIOProcesses, state.runningProcess],
      runningProcess: {}
    });
  },

  [ProcessConstants.TAKE_ONE_WAITING_TO_USINGIO]: (state, payload) => {
    return Object.assign({}, state, {
      usingIOProcess: state.waitingIOProcesses[0] ? Object.assign({}, state.waitingIOProcesses[0], {IOGoalTime: payload.goalTime} ) : {},
      waitingIOProcesses: [...state.waitingIOProcesses.slice(1)]
    });
  },

  [ProcessConstants.MOVE_USINGIO_TO_READY]: (state) => {
    return Object.assign({}, state, {
      readyProcesses: [...state.readyProcesses, Object.assign({}, state.usingIOProcess, {IOUsed: true})],
      usingIOProcess: {}
    });
  },

  [ProcessConstants.MOVE_USINGIO_TO_ERROR]: (state) => {
    return Object.assign({}, state, {
      errorProcesses: [...state.errorProcesses,
      Object.assign({}, state.usingIOProcess, { currentCPUTime: 'ERROR' })],
      usingIOProcess: {}
    });
  },

  [ProcessConstants.NEW_LIST_LIMIT]: (state, payload) => {
    return Object.assign({}, state, {
      newListLimit: payload.limit
    });
  },

  [ProcessConstants.READY_LIST_LIMIT]: (state, payload) => {
    return Object.assign({}, state, {
      readyListLimit: payload.limit
    });
  },

  [ProcessConstants.WAITING_LIST_LIMIT]: (state, payload) => {
    return Object.assign({}, state, {
      waitingListLimit: payload.limit
    });
  },

  [ProcessConstants.RESTART_PROCESSES]: () => {
    return initialState;
  },

  [ProcessConstants.UPDATE_HOLD_MEMORY]: (state, payload) => {
    return Object.assign({}, state, {
      newProcesses: [...state.newProcesses.slice(0, payload.index),
      Object.assign({}, state.newProcesses[payload.index], {
        frameList: [...state.newProcesses[payload.index].frameList.slice(0, payload.memory),
        payload.value, ...state.newProcesses[payload.index].frameList.slice(payload.memory + 1)]
      }),
      ...state.newProcesses.slice(payload.index + 1)]
    });
  },

  [ProcessConstants.UPDATE_RUNNING_MEMORY]: (state, payload) => {
    const newFrame = getRandomIntInclusive(0, state.runningProcess.frameList.length - 1);
    return Object.assign({}, state, {
      runningProcess: Object.assign({}, state.runningProcess, {
        frameList: [...state.runningProcess.frameList.slice(0, newFrame),
        payload.index, ...state.runningProcess.frameList.slice(newFrame + 1)],
        frameLoaded: newFrame,
        needsDisk: true
      })
    });
  }

});
