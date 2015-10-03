import { createReducer } from 'utils';
import { SET_DURATION_AVERAGE } from '../constants/DurationAverage';

const initialState = 10;

export default createReducer(initialState, {
  [SET_DURATION_AVERAGE] : (state, payload) => {
    return payload.duration;
  }
});
