import React from 'react';
import { connect } from 'react-redux';
import Clock from './clock';
import Lists from './lists';
import PCB from './pcb';
import Properties from './properties';
// import Modal from './modal';
import TAP from './tap';
import Memory from './memory';
import * as TimeActions from '../creators/time';
import * as SpeedActions from '../creators/speed';
import * as ProcessActions from '../creators/spawnActions';
import * as QuantumActions from '../creators/quantum';
import * as IOActions from '../creators/IO';
import * as MemoryActions from '../creators/memory';
import { setDurationAverage } from '../creators/duration';

@connect(state => ({
  time : state.time,
  speed : state.speed,
  clock : state.clock,
  spawnRate: state.spawnRate,
  newFrameRate: state.newFrameRate,
  processes: state.processes,
  quantum: state.quantum,
  IO: state.IO,
  durationAverage: state.durationAverage,
  memory: state.memory
}))

export default class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    time : React.PropTypes.number.isRequired,
    speed : React.PropTypes.number.isRequired,
    clock : React.PropTypes.string.isRequired,
    spawnRate: React.PropTypes.number.isRequired,
    newFrameRate: React.PropTypes.number.isRequired,
    processes: React.PropTypes.object.isRequired,
    quantum: React.PropTypes.object.isRequired,
    IO: React.PropTypes.object.isRequired,
    durationAverage: React.PropTypes.number.isRequired,
    memory: React.PropTypes.object.isRequired
  }

  constructor () {
    super();
    this._resume = this._resume.bind(this);
    this._pause = this._pause.bind(this);
    this.timeoutCallback = this.timeoutCallback.bind(this);
    this.createNewProcessWithRandomValues = this.createNewProcessWithRandomValues.bind(this);
    this.findMemoryPosition = this.findMemoryPosition.bind(this);
    this.findHighlighted = this.findHighlighted.bind(this);
  }

  componentDidMount () {
    this._question();
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
    const memory = this.getRandomIntInclusive(16, 256);
    const pages = Math.ceil(memory / this.props.memory.frameSize);

    this.props.dispatch(ProcessActions.spawnProcessNew(this.props.time, duration, ioTime, memory, pages));
  }

  findMemoryPosition() {
    const table = this.props.memory.table;
    let time = Number.MAX_VALUE;
    let index = 0;
    table.forEach((val, i) => {
      if (val.time < time) {
        time = val.time;
        index = i;
      }
    });
    return index;
  }

  findHighlighted() {
    const runningProcess = this.props.processes.runningProcess;
    const frameLoaded = this.props.processes.runningProcess.frameLoaded;
    if (!this.isRunningEmpty()) return runningProcess.frameList[frameLoaded];
    else return -1;
  }

  timeoutCallback () {
    if (this.props.clock === 'RUNNING') {
      if (this.isRunningEmpty()) {
        this.props.dispatch(ProcessActions.takeOneReadyToRunning());
        const sizediff = this.props.processes.readyListLimit -
          this.props.processes.readyProcesses.length;
        // ok antes de moverlos a ready, mientras estan en hold vamos a
        // asignar lugar en memoria consta de nomas pasarle un id al arreglo de
        // los frames que tiene cada proceso asi que deberiamos de primero
        // sacar el lugar en memoria que va a ocupar nuestro proceso

        // para cada proceso que esta entre 0 y sizediff - 1
        const newProcesses = this.props.processes.newProcesses;
        for (let i = 0; i < sizediff; i++) {
          if (newProcesses[i]) {
            const index = this.findMemoryPosition();
            this.props.dispatch(MemoryActions.setMemory(index, newProcesses[i].id, this.props.time));
            this.props.dispatch(ProcessActions.setHoldMemory(i, 0, index));
          }
        }
        this.props.dispatch(ProcessActions.moveNewToReady(sizediff));
      }

      if (this.isUsingIOEmpty()) {
        this.props.dispatch(ProcessActions.takeOneWaitingToUsingIO(this.props.IO.limit));
      }

      if (!this.isRunningEmpty()) {
        const runningProcess = this.props.processes.runningProcess;

        // process ended and needs to exit
        if (runningProcess.currentCPUTime === runningProcess.totalCPUTime) {
          this.props.dispatch(ProcessActions.moveRunningToFinished(this.props.time));
          this.props.dispatch(QuantumActions.restartQuantum());
          // process hasnt ended but needs IO
        } else if (runningProcess.currentCPUTime === runningProcess.IOTime && !runningProcess.IOUsed) {
          // process needs io but check if its full
          if (this.props.processes.waitingIOProcesses.length >= this.props.processes.waitingListLimit) {
            this.props.dispatch(ProcessActions.moveRunningToError());
            // move to io
          } else {
            this.props.dispatch(ProcessActions.moveRunningToWaiting());
          }
          this.props.dispatch(QuantumActions.restartQuantum());
          // process hasnt ennded, check if it has passed its quantum
        } else if (this.props.quantum.enabled && this.props.quantum.running >= this.props.quantum.limit) {
          // check if its full
          if (this.props.processes.readyProcesses.length >= this.props.processes.readyListLimit) {
            this.props.dispatch(ProcessActions.moveRunningToError());
            // move to running due to quantum
          } else {
            this.props.dispatch(ProcessActions.moveRunningToReady());
          }
          this.props.dispatch(QuantumActions.restartQuantum());
          // process hasnt ended and doesnt need quantum, tick the process
        } else {
          this.props.dispatch(ProcessActions.tickRunningProcess());
          this.props.dispatch(QuantumActions.quantumTick());
          const randomProb = this.getRandomIntInclusive(1, 100);
          if (randomProb <= this.props.newFrameRate) {
            const index = this.findMemoryPosition();
            this.props.dispatch(ProcessActions.loadNewFrame(index));
            this.props.dispatch(MemoryActions.setMemory(index, this.props.processes.runningProcess.id, this.props.time));
          }
        }
      }

      if (!this.isUsingIOEmpty()) {
        if (this.props.IO.running >= this.props.processes.usingIOProcess.IOGoalTime) {
          if (this.props.processes.readyProcesses.length >= this.props.processes.readyListLimit) {
            this.props.dispatch(ProcessActions.moveUsingIOToError());
          } else {
            this.props.dispatch(ProcessActions.moveUsingIOToReady());
          }
          this.props.dispatch(IOActions.restartIO());
        } else {
          this.props.dispatch(IOActions.tickIO());
        }
      }

      if (this.props.processes.newProcesses.length < this.props.processes.newListLimit) {
        const randomProb = this.getRandomIntInclusive(1, 100);
        if (randomProb <= this.props.spawnRate) {
          this.createNewProcessWithRandomValues();
        }
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

  _restart () {
    if (window.confirm('are you sure you want to restart?')) {
      this.props.dispatch(TimeActions.restart());
      this.props.dispatch(TimeActions.pause());
      this.props.dispatch(ProcessActions.restart());
      this.props.dispatch(IOActions.restartIO());
      this.props.dispatch(QuantumActions.restartQuantum());
    }
  }

  _question () {
    $('#myModal').modal('show');
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

  _newFrameProbability (probabilityF) {
    const prob = Number(probabilityF);
    this.props.dispatch(ProcessActions.setNewFrameRate(prob));
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

  _setNewListLimit(limit) {
    const n = Number(limit);
    if (n >= this.props.processes.newProcesses.length) {
      this.props.dispatch(ProcessActions.setNewListLimit(n));
    }
  }

  _setReadyListLimit(limit) {
    const n = Number(limit);
    if (n >= this.props.processes.readyProcesses.length) {
      this.props.dispatch(ProcessActions.setReadyListLimit(n));
    }
  }

  _setWaitingListLimit(limit) {
    const n = Number(limit);
    if (n >= this.props.processes.waitingIOProcesses.length) {
      this.props.dispatch(ProcessActions.setWaitingListLimit(n));
    }
  }

  render () {
    const highlighted = this.findHighlighted();
    return (
      <div className='container-fluid text-center'>
        <div className='row'>
          <div className='col-md-3 bg-info'>
            <div className='row'>
              <div className='col-md-3'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUNDNjJBRjdFQjgyRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGM0RENEFGQTJEODMxMUU1QjQ4QkIwRjdGNEM3OUNFMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGM0RENEFGOTJEODMxMUU1QjQ4QkIwRjdGNEM3OUNFMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFDQzYyQUY3RUI4MkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFDQzYyQUY3RUI4MkUiLz4gPC9yZGY6RGVzY3Jp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"
                     height='200%'
                     width='200%'
                />
              </div>
                <h1 style={{paddingRight: '30px'}}>Redux-OS</h1>
              <div className='col-md-9'>
              </div>
            </div>
            <Properties slow={::this._slowClock}
                        normal={::this._normalClock}
                        fast={::this._fastClock}
                        spawnHandler={::this._spawnProbability}
                        newFrameHandler={::this._newFrameProbability}
                        spawnRate={this.props.spawnRate}
                        newFrameRate={this.props.newFrameRate}
                        quantumLimit={::this._quantumLimit}
                        quantum={this.props.quantum}
                        IO={this.props.IO}
                        IOLimit={::this._IOLimit}
                        durationAverage={this.props.durationAverage}
                        setDurationAverage={::this._durationAvg}
                        pause={this._pause.bind(this)}
                        resume={this._resume.bind(this)}
                        restart={::this._restart}
                        question={::this._question}
                        enableQuantum={::this._enableQuantum}
                        disableQuantum={::this._disableQuantum}
                        newListLimit={this.props.processes.newListLimit}
                        readyListLimit={this.props.processes.readyListLimit}
                        waitingListLimit={this.props.processes.waitingListLimit}
                        setNewListLimit={::this._setNewListLimit}
                        setReadyListLimit={::this._setReadyListLimit}
                        setWaitingListLimit={::this._setWaitingListLimit} />
          </div>
          <div className='col-md-9 bg-warning'>
            <div className='row'>
              <Clock time={this.props.time}/>
              <Lists processes={this.props.processes}/>
            </div>
          </div>
        </div>
        <TAP processes={this.props.processes}/>
        <Memory table={this.props.memory.table} highlighted={highlighted}/>
        <PCB processes={this.props.processes} frameSize={this.props.memory.frameSize}/>
      </div>
    );
  }
}
