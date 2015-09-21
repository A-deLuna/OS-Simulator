import { combineReducers } from 'redux';
import time from './time';
import speed from './speed';
import clock from './clock';
import spawnRate from './spawnRate';
import processes from './processes';

export default combineReducers({
  time,
  speed,
  clock,
  spawnRate,
  processes
});
