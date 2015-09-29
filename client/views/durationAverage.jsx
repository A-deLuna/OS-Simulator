import React from 'react';

export default class DurationAverage extends React.Component {
  static propTypes = {
    durationAverage: React.PropTypes.number.isRequired,
    setDurationAverage: React.PropTypes.func.isRequired
  }

  handleChange(e) {
    this.props.setDurationAverage(e.target.value.trim());
  }
  render () {
    return (
      <div>
        <span>process duration avg.</span>
        <input type='text' onChange={this.handleChange.bind(this)} value={this.props.durationAverage}/>
      </div>
    );
  }
}
