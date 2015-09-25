import React from 'react';

export default class Clock extends React.Component {
  static propTypes = {
    time : React.PropTypes.number.isRequired
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='col-md-1'>
        <h1>Clock</h1>
        <h1>{this.props.time}</h1>
      </div>
    );
  }
}
