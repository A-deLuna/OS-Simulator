import { combineReducers } from 'redux';
import time from './time';
import speed from './speed';
import clock from './clock';
import spawnRate from './spawnRate';
import processes from './processes';
import quantum from './quantum';
import IO from './IO';
import durationAverage from './durationAverage';
import memory from './memory';

export default combineReducers({
  time,
  speed,
  clock,
  spawnRate,
  processes,
  quantum,
  IO,
  durationAverage,
  memory
});
