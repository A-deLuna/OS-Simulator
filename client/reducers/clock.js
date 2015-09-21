import { createReducer } from 'utils';
import { PAUSE, RESUME, RUNNING } from '../constants/Time';

const initialState = RUNNING;
export default createReducer(initialState, {
  [PAUSE] : () => {
    return PAUSE;
  },
  [RESUME] : () => {
    return RUNNING;
  }
});
