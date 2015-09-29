import { createReducer } from 'utils';
import { SET_IO_LIMIT, IO_TICK, RESTART_IO} from '../constants/IO';

const initialState = {
  limit: 5,
  running: 0
};

export default createReducer(initialState, {
  [SET_IO_LIMIT] : (state, payload) => {
    return Object.assign({}, state, {
      limit: payload.limit
    });
  },
  [IO_TICK] : (state) => {
    return Object.assign({}, state, {
      running: state.running + 1
    });
  },
  [RESTART_IO]: (state) => {
    return Object.assign({}, state, {
      running: 0
    });
  }

});
