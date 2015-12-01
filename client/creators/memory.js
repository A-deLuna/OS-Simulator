import * as MemoryConstants from '../constants/Memory';

export function setMemory(index, id) {
  return {type: MemoryConstants.SET_MEMORY, payload: {index, id}};
}
