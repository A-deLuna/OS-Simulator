import React from 'react';
import { SpeedChooser } from './speedChooser';
import { SpawningProbabilitySelector } from './spawningProbabilitySelector';

export class Properties extends React.Component {
  static propTypes = {
    slow: React.PropTypes.func.isRequired,
    normal: React.PropTypes.func.isRequired,
    fast: React.PropTypes.func.isRequired,
    spawnHandler : React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <SpeedChooser {...this.props} />
        <SpawningProbabilitySelector setSpawningProbability={this.props.spawnHandler} />
      </div>
    );
  }
}
