import React from 'react';

export default class QuantumEditor extends React.Component {
  static propTypes = {
    quantumLimit: React.PropTypes.func.isRequired,
    quantum: React.PropTypes.object.isRequired
  }

  handleChange(e) {
    this.props.quantumLimit(e.target.value.trim());
  }
  render () {
    return (
      <div>
        <span>quantum: </span>
        <input type='text' onChange={this.handleChange.bind(this)}
                           value={this.props.quantum.limit}/>
      </div>
    );
  }
}
