import React from 'react';

export default class WaitingIOList extends React.Component {
  static propTypes = {
    waitingIOProcesses: React.PropTypes.array.isRequired
  }
  render () {
    const nodes = this.props.waitingIOProcesses.map(process => {
      return (
          <p key={process.id}>P{process.id}</p>
      );
    });
    return (
      <div>
        <h3>Waiting IO</h3>
        {nodes}
      </div>
    );
  }
}
