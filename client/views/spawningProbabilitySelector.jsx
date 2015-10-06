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
        <div className='col-md-5'>
          <span>spawn probablility:</span>
        </div>
        <div className='col-md-5'>
          <input type='text' onChange={this.handleChange.bind(this)}
                             value={spawnRate}/>
        </div>
      </div>
    );
  }
}
