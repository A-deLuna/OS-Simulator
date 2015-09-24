import React from 'react';

export class SpawningProbabilitySelector extends React.Component {
  static propTypes = {
    setSpawningProbability : React.PropTypes.func.isRequired,
    spawnRate: React.PropTypes.number.isRequired
  }

  handleChange(e) {
    this.props.setSpawningProbability(e.target.value.trim());
  }

  render () {
    const spawnRate = this.props.spawnRate;
    return (
      <div className='row'>
        <span>spawn probablility</span>
        <input type='text' onChange={this.handleChange.bind(this)}
                           value={spawnRate}/>
      </div>
    );
  }
}
