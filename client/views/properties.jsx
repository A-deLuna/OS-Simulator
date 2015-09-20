import React from 'react';
import { SpeedChooser } from './speedChooser';
import { SpawningProbabilitySelector } from './spawningProbabilitySelector';

export class Properties extends React.Component {
  static propTypes = {
    slow: React.PropTypes.func.isRequired,
    normal: React.PropTypes.func.isRequired,
    fast: React.PropTypes.func.isRequired,
    spawnHandler : React.PropTypes.func.isRequired,
    spawnRate: React.PropTypes.number.isRequired
  }

  render() {
    const spawnHandler = this.props.spawnHandler;
    return (
      <div>
        <SpeedChooser {...this.props} />
        <SpawningProbabilitySelector setSpawningProbability={spawnHandler}
                                     spawnRate={this.props.spawnRate}/>
      </div>
    );
  }
}
