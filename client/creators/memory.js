import * as MemoryConstants from '../constants/Memory';

export function setMemory(index, id, time) {
  return {type: MemoryConstants.SET_MEMORY, payload: {index, id, time}};
}

export function highlightLoadedFrame(index) {
  return {type: MemoryConstants.HIGHLIGHT_FRAME, payload: {index}};
}
