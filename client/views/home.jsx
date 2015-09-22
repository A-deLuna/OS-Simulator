import React from 'react';
import { connect } from 'react-redux';
import Clock from './clock';
import Lists from './lists';
import PCB from './pcb';
import Properties from './properties';
import * as TimeActions from '../creators/time';
import * as SpeedActions from '../creators/speed';
import * as ProcessActions from '../creators/spawnActions';

@connect(state => ({
  time : state.time,
  speed : state.speed,
  clock : state.clock,
  spawnRate: state.spawnRate,
  processes: state.processes
}))

export default class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    time : React.PropTypes.number.isRequired,
    speed : React.PropTypes.number.isRequired,
    clock : React.PropTypes.string.isRequired,
    spawnRate: React.PropTypes.number.isRequired,
    processes: React.PropTypes.object.isRequired
  }

  constructor () {
    super();
    this._resume = this._resume.bind(this);
    this._pause = this._pause.bind(this);
    this.timeoutCallback = this.timeoutCallback.bind(this);
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

  timeoutCallback () {
    if (this.props.clock === 'RUNNING') {
      if (this.isRunningEmpty()) {
        this.props.dispatch(ProcessActions.takeOneReadyToRunning());
        this.props.dispatch(ProcessActions.moveNewToReady());
      }
      const randomProb = this.getRandomIntInclusive(1, 100);
      if (randomProb <= this.props.spawnRate) {
        this.props.dispatch(ProcessActions.spawnProcessNew(this.props.time, 10, 8));
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

  render () {
    return (
      <div className='container text-center'>
        <Clock time={this.props.time}/>
        <Lists processes={this.props.processes}/>
        <Properties slow={::this._slowClock}
                    normal={::this._normalClock}
                    fast={::this._fastClock}
                    spawnHandler={::this._spawnProbability}
                    spawnRate={this.props.spawnRate}/>
        <button onClick={this._pause.bind(this)}>Pause</button>
        <button onClick={this._resume.bind(this)}>Resume</button>
        <PCB processes={this.props.processes}/>
      </div>
    );
  }
}
