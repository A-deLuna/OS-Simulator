import { SET_LIMIT, QUANTUM_TICK, RESTART_QUANTUM } from '../constants/Quantum';

export function quantumTick() {
  return {type: QUANTUM_TICK};
}

export function setQuantumLimit(limit) {
  return {type: SET_LIMIT, payload:{ limit: limit }};
}

export function restartQuantum() {
  return {type: RESTART_QUANTUM};
}
