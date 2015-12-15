import { createReducer } from 'utils';
import * as MemoryConstants from '../constants/Memory';

const initialState = {
  table: new Array(256 / 4),
  frameSize: 4,
  ram: 256
};

for (let i = 0; i < (initialState.ram / initialState.frameSize) / 4; i++) {
  initialState.table[i] = {val: MemoryConstants.OS, time: Number.MAX_SAFE_INTEGER};
}
for (let i =  (initialState.ram / initialState.frameSize) / 4; i < initialState.table.length; i++) {
  initialState.table[i] = {val: MemoryConstants.EMPTY, time: 0};
}

export default createReducer(initialState, {
  [MemoryConstants.SET_MEMORY] : (state, payload) => {
    return Object.assign({}, state, {
      table: [...state.table.slice(0, payload.index), {val: payload.id, time: payload.time }, ...state.table.slice(payload.index + 1)]
    });
  }
});
