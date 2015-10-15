import { createReducer } from 'utils';
import { TICK, RESTART } from '../constants/Time';

const initialState = 0;

export default createReducer(initialState, {
  [TICK] : (state) => {
    return state + 1;
  },

  [RESTART] : () => {
    return initialState;
  }
});
