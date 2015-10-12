import React from 'react';
import { connect } from 'react-redux';
import Clock from './clock';
import Lists from './lists';
import PCB from './pcb';
import Properties from './properties';
import * as TimeActions from '../creators/time';
import * as SpeedActions from '../creators/speed';
import * as ProcessActions from '../creators/spawnActions';
import * as QuantumActions from '../creators/quantum';
import * as IOActions from '../creators/IO';
import { setDurationAverage } from '../creators/duration';

@connect(state => ({
  time : state.time,
  speed : state.speed,
  clock : state.clock,
  spawnRate: state.spawnRate,
  processes: state.processes,
  quantum: state.quantum,
  IO: state.IO,
  durationAverage: state.durationAverage
}))

export default class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    time : React.PropTypes.number.isRequired,
    speed : React.PropTypes.number.isRequired,
    clock : React.PropTypes.string.isRequired,
    spawnRate: React.PropTypes.number.isRequired,
    processes: React.PropTypes.object.isRequired,
    quantum: React.PropTypes.object.isRequired,
    IO: React.PropTypes.object.isRequired,
    durationAverage: React.PropTypes.number.isRequired
  }

  constructor () {
    super();
    this._resume = this._resume.bind(this);
    this._pause = this._pause.bind(this);
    this.timeoutCallback = this.timeoutCallback.bind(this);
    this.createNewProcessWithRandomValues = this.createNewProcessWithRandomValues.bind(this);
  }

  componentDidMount () {
    setTimeout(this.timeoutCallback, this.props.speed);
  }
  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isRunningEmpty() {
    return Object.getOwnPropertyNames(this.props.processes.runningProcess).length === 0;
  }

  isUsingIOEmpty () {
    return Object.getOwnPropertyNames(this.props.processes.usingIOProcess).length === 0;
  }

  createNewProcessWithRandomValues() {
    const durationAverage = this.props.durationAverage;
    const low = Math.round(durationAverage * 0.75);
    const high = Math.round(durationAverage * 1.25);
    const duration = this.getRandomIntInclusive(low, high);
    const ioTime = this.getRandomIntInclusive(2, duration - 1);

    this.props.dispatch(ProcessActions.spawnProcessNew(this.props.time, duration, ioTime));
  }

  timeoutCallback () {
    if (this.props.clock === 'RUNNING') {
      if (this.isUsingIOEmpty()) {
        this.props.dispatch(ProcessActions.takeOneWaitingToUsingIO(this.props.IO.limit));
      }

      if (this.isRunningEmpty()) {
        this.props.dispatch(ProcessActions.takeOneReadyToRunning());
        this.props.dispatch(ProcessActions.moveNewToReady());
      }

      if (!this.isUsingIOEmpty()) {
        this.props.dispatch(IOActions.tickIO());

        if (this.props.IO.running >= this.props.processes.usingIOProcess.IOGoalTime) {
          this.props.dispatch(ProcessActions.moveUsingIOToReady());
          this.props.dispatch(IOActions.restartIO());
        }
      }

      if (!this.isRunningEmpty()) {
        this.props.dispatch(ProcessActions.tickRunningProcess());
        this.props.dispatch(QuantumActions.quantumTick());

        const runningProcess = this.props.processes.runningProcess;

        if (runningProcess.currentCPUTime === runningProcess.IOTime) {
          this.props.dispatch(ProcessActions.moveRunningToWaiting());
          this.props.dispatch(QuantumActions.restartQuantum());
        }

        if (runningProcess.currentCPUTime === runningProcess.totalCPUTime) {
          this.props.dispatch(ProcessActions.moveRunningToFinished(this.props.time));
          this.props.dispatch(QuantumActions.restartQuantum());
        } else {
          if (this.props.quantum.running >= this.props.quantum.limit) {
            this.props.dispatch(ProcessActions.moveRunningToReady());
            this.props.dispatch(QuantumActions.restartQuantum());
          }
        }
      }

      const randomProb = this.getRandomIntInclusive(1, 100);
      if (randomProb <= this.props.spawnRate) {
        this.createNewProcessWithRandomValues();
      }
      this.props.dispatch(TimeActions.timeTick());
      setTimeout(this.timeoutCallback, this.props.speed);
    }
  }

  _pause () {
    this.props.dispatch(TimeActions.pause());
  }

  _resume () {
    if (this.props.clock === 'PAUSE') {
      this.props.dispatch(TimeActions.resume());
      setTimeout(this.timeoutCallback, this.props.speed);
    }
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!

  _slowClock () {
    this.props.dispatch(SpeedActions.slow());
  }

  _normalClock () {
    this.props.dispatch(SpeedActions.normal());
  }

  _fastClock () {
    this.props.dispatch(SpeedActions.fast());
  }

  _spawnProbability (probabilityS) {
    const prob = Number(probabilityS);
    this.props.dispatch(ProcessActions.setRate(prob));
  }

  _quantumLimit(limit) {
    const lim = Number(limit);
    this.props.dispatch(QuantumActions.setQuantumLimit(lim));
  }

  _IOLimit(limit) {
    const lim = Number(limit);
    this.props.dispatch(IOActions.setIOLimit(lim));
  }

  _durationAvg(average) {
    const avg = Number(average);
    this.props.dispatch(setDurationAverage(avg));
  }

  _enableQuantum() {
    this.props.dispatch(QuantumActions.enableQuantum());
  }

  _disableQuantum() {
    this.props.dispatch(QuantumActions.disableQuantum());
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row'>
          <div className='col-md-3 bg-info'>
            <Properties slow={::this._slowClock}
                        normal={::this._normalClock}
                        fast={::this._fastClock}
                        spawnHandler={::this._spawnProbability}
                        spawnRate={this.props.spawnRate}
                        quantumLimit={::this._quantumLimit}
                        quantum={this.props.quantum}
                        IO={this.props.IO}
                        IOLimit={::this._IOLimit}
                        durationAverage={this.props.durationAverage}
                        setDurationAverage={::this._durationAvg}
                        pause={this._pause.bind(this)}
                        resume={this._resume.bind(this)}
                        enableQuantum={::this._enableQuantum}
                        disableQuantum={::this._disableQuantum} />
          </div>
          <div className='col-md-9 bg-warning'>
            <div className='row'>
              <Clock time={this.props.time}/>
              <Lists processes={this.props.processes}/>
            </div>
          </div>
        </div>
        <PCB processes={this.props.processes}/>
      </div>
    );
  }
}
