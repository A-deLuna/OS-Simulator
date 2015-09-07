import { combineReducers } from 'redux';
import time from './time';
import speed from './speed';
import clock from './clock';

export default combineReducers({
  time,
  speed,
  clock
});
