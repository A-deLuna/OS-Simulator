import { createReducer } from 'utils';
import { SLOW, NORMAL, FAST } from '../constants/Speed';

const initialState = 1000;

export default createReducer(initialState, {
  [SLOW] : () => {
    return 2000;
  },
  [NORMAL] : () => {
    return 1000;
  },
  [FAST] : () => {
    return 500;
  }
});
