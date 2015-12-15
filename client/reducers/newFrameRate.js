import { createReducer } from 'utils';
import { SET_FRAME_RATE } from '../constants/Spawn';

const initialState = 1;

export default createReducer(initialState, {
  [SET_FRAME_RATE] : (state, payload) => {
    return payload;
  }
});
