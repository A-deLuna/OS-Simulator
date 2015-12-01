import { createReducer } from 'utils';
import * as MemoryConstants from '../constants/Memory';

const initialState = {
  table: new Array(256 / 4)
};

for (let i = 0; i < (initialState.ram / initialState.frameSize) / 4; i++) {
  initialState.table[i] = MemoryConstants.OS;
}
for (let i =  (initialState.ram / initialState.frameSize) / 4; i < initialState.table.length; i++) {
  initialState.table[i] = MemoryConstants.EMPTY;
}

export default createReducer(initialState, {
  [MemoryConstants.SET_MEMORY] : (state, payload) => {
    alert(JSON.stringify(payload));
    return Object.assign({}, state, {
      table: [...state.table.slice(0, payload.index), payload.id, ...state.table.slice(payload.index + 1)]
    });
  }
});
