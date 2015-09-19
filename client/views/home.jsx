import React from 'react';
import { connect } from 'react-redux';
import { Clock } from './clock';
import { Properties } from './properties';
import * as TimeActions from '../creators/time';
import * as SpeedActions from '../creators/speed';
import * as SpawnActions from '../creators/spawnActions';

@connect(state => ({
  time : state.time,
  speed : state.speed,
  clock : state.clock
}))
export default class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    time : React.PropTypes.number.isRequired,
    speed : React.PropTypes.number.isRequired,
    clock : React.PropTypes.string.isRequired
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

  timeoutCallback () {
    if (this.props.clock === 'RUNNING') {
      this.props.dispatch(TimeActions.timeTick());
      setTimeout(this.timeoutCallback, this.props.speed);
    }
  }

  _pause () {
    this.props.dispatch(TimeActions.pause());
  }

  _resume () {
    this.props.dispatch(TimeActions.resume());
    setTimeout(this.timeoutCallback, this.props.speed);
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
    prob = Number(probabilityS);
    this.props.dispatch(SpawnActions.setRate(prob));
  }

  render () {
    return (
      <div className='container text-center'>
        <Clock time={this.props.time}/>
        <Properties slow={::this._slowClock}
                    normal={::this._normalClock}
                    fast={::this._fastClock}
                    spawnHandler={::this._spawnProbability}/>
        <button onClick={this._pause.bind(this)}>Pause</button>
        <button onClick={this._resume.bind(this)}>Resume</button>
      </div>
    );
  }
}
