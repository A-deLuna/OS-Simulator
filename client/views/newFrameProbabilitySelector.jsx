import React from 'react';

export default class NewFrameProbabilitySelector extends React.Component {
  static propTypes = {
    setNewFrameProbability : React.PropTypes.func.isRequired,
    spawnRate: React.PropTypes.number.isRequired
  }

  handleChange(e) {
    if (e.target.value >= 0 && e.target.value <= 100) {
      this.props.setNewFrameProbability(e.target.value.trim());
    }
  }

  render () {
    const spawnRate = this.props.spawnRate;
    return (
      <div className='row'>
        <div className='col-md-5'>
          <span>new frame probablility:</span>
        </div>
        <div className='col-md-5'>
          <input type='number' onChange={this.handleChange.bind(this)}
                             value={spawnRate}/>
        </div>
      </div>
    );
  }
}
