import React from 'react';

export default class ReadyList extends React.Component {
  static propTypes = {
    readyProcesses: React.PropTypes.array.isRequired
  }
  constructor () {
    super();
  }

  render () {
    const nodes = this.props.readyProcesses.map((process) => {
      return (
        <p>{process.id}</p>
      );
    });
    return (
      <div>
        <h3>ready</h3>
        {nodes}
      </div>
    );
  }
}
