import React from 'react';

export default class QuantumEditor extends React.Component {
  static propTypes = {
    quantumLimit: React.PropTypes.func.isRequired,
    quantum: React.PropTypes.object.isRequired
  }

  handleChange(e) {
    if (e.target.value >= 1) {
      this.props.quantumLimit(e.target.value);
    }
  }
  render () {
    return (
      <div className='row'>
        <div className='col-md-5'>
          <span>quantum: </span>
        </div>
        <div className='col-md-5'>
          <input type='number' onChange={this.handleChange.bind(this)}
                             value={this.props.quantum.limit}/>
        </div>
      </div>
    );
  }
}
