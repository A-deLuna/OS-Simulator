import React from 'react';

export class SpawningProbabilitySelector extends React.Component {
  static propTypes = {
    setSpawningProbability : React.PropTypes.func.isRequired
  }

  handleChange(e) {
    this.props.setSpawningProbability(e.target.value.trim());
  }

  render () {
    return (
      <div>
        <input type='text' onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
