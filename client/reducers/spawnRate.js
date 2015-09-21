import { createReducer } from 'utils';
import { SET_RATE } from '../constants/Spawn';

const initialState = 50;

export default createReducer(initialState, {
  [SET_RATE] : (state, payload) => {
    return payload;
  }
});
