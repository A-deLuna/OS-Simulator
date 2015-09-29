import React from 'react';
import { SpeedChooser } from './speedChooser';
import { SpawningProbabilitySelector } from './spawningProbabilitySelector';
import QuantumEditor from './quantumEditor';
import IOEditor from './IOEditor';

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
    IOLimit: React.PropTypes.func.isRequired
  }

  render() {
    const spawnHandler = this.props.spawnHandler;
    return (
      <div>
        <SpeedChooser {...this.props} />
        <SpawningProbabilitySelector setSpawningProbability={spawnHandler}
                                     spawnRate={this.props.spawnRate}/>
        <QuantumEditor quantum={this.props.quantum} quantumLimit={this.props.quantumLimit}/>
        <IOEditor IO={this.props.IO} setIOLimit={this.props.IOLimit}/>
      </div>
    );
  }
}
