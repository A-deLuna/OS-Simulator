import { createReducer } from 'utils';
import { SET_LIMIT, QUANTUM_TICK, RESTART_QUANTUM, DISABLE_QUANTUM, ENABLE_QUANTUM } from '../constants/Quantum';

const initialState = {
  limit: 5,
  running: 0,
  enabled: true
};

export default createReducer(initialState, {
  [SET_LIMIT] : (state, payload) => {
    return Object.assign({}, state, {
      limit: payload.limit
    });
  },
  [QUANTUM_TICK] : (state) => {
    return Object.assign({}, state, {
      running: state.running + 1
    });
  },
  [RESTART_QUANTUM]: (state) => {
    return Object.assign({}, state, {
      running: 0
    });
  },
  [DISABLE_QUANTUM]: (state) => {
    return Object.assign({}, state, {
      enabled: false
    });
  },
  [ENABLE_QUANTUM]: (state) => {
    return Object.assign({}, state, {
      enabled: true
    });
  }

});
