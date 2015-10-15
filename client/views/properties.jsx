import React from 'react';
import { SpeedChooser } from './speedChooser';
import { SpawningProbabilitySelector } from './spawningProbabilitySelector';
import QuantumEditor from './quantumEditor';
import IOEditor from './IOEditor';
import DurationAverage from './durationAverage';
import AlgorithmChooser from './algorithmChooser';
import ListLimits from './listLimits';

export default class Properties extends React.Component {
  static propTypes = {
    slow: React.PropTypes.func.isRequired,
    normal: React.PropTypes.func.isRequired,
    fast: React.PropTypes.func.isRequired,
    spawnHandler : React.PropTypes.func.isRequired,
    spawnRate: React.PropTypes.number.isRequired,
    quantumLimit: React.PropTypes.func.isRequired,
    quantum: React.PropTypes.object.isRequired,
    IO: React.PropTypes.object.isRequired,
    IOLimit: React.PropTypes.func.isRequired,
    durationAverage: React.PropTypes.number.isRequired,
    setDurationAverage: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    resume: React.PropTypes.func.isRequired,
    restart: React.PropTypes.func.isRequired,
    enableQuantum: React.PropTypes.func.isRequired,
    disableQuantum: React.PropTypes.func.isRequired,
    newListLimit: React.PropTypes.number.isRequired,
    readyListLimit: React.PropTypes.number.isRequired,
    waitingListLimit: React.PropTypes.number.isRequired,
    setNewListLimit: React.PropTypes.func.isRequired,
    setReadyListLimit: React.PropTypes.func.isRequired,
    setWaitingListLimit: React.PropTypes.func.isRequired
  }

  render() {
    const spawnHandler = this.props.spawnHandler;
    return (
      <div>
        <div className='row'>
          <h3>Properties</h3>
        </div>
        <div className='row'>
          <button className='btn btn-default' onClick={this.props.resume}>
            <span className='glyphicon glyphicon-play'></span>
          </button>
          <button className='btn btn-default' onClick={this.props.pause}>
            <span className='glyphicon glyphicon-pause'></span>
         </button>
          <button className='btn btn-default' onClick={this.props.restart}>
            <span className='glyphicon glyphicon-stop'></span>
         </button>
         </div>
        <SpeedChooser {...this.props} />
        <SpawningProbabilitySelector setSpawningProbability={spawnHandler}
                                     spawnRate={this.props.spawnRate}/>
        <QuantumEditor quantum={this.props.quantum} quantumLimit={this.props.quantumLimit}/>
        <IOEditor IO={this.props.IO} setIOLimit={this.props.IOLimit}/>
        <DurationAverage setDurationAverage={this.props.setDurationAverage} durationAverage={this.props.durationAverage}/>
        <AlgorithmChooser enableQuantum={this.props.enableQuantum}
                          disableQuantum={this.props.disableQuantum} />
        <ListLimits newListLimit={this.props.newListLimit}
		    readyListLimit={this.props.readyListLimit}
		    waitingListLimit={this.props.waitingListLimit}
                    setNewListLimit={this.props.setNewListLimit}
                    setReadyListLimit={this.props.setReadyListLimit}
                    setWaitingListLimit={this.props.setWaitingListLimit} />
      </div>
    );
  }
}
