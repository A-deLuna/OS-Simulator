import { SET_DURATION_AVERAGE } from '../constants/DurationAverage';
export function setDurationAverage(avg) {
  return {type:SET_DURATION_AVERAGE, payload: {duration: avg}};
}
