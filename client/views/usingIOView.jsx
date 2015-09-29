import React from 'react';

export default class UsingIOView extends React.Component {
  static propTypes = {
    usingIOProcess: React.PropTypes.object.isRequired
  }
  render () {
    return (
      <div>
        <h3>Using IO</h3>
        <p>P{this.props.usingIOProcess.id}</p>
      </div>
    );
  }
}
