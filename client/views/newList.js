import React from 'react';

export default class NewList extends React.Component {
  static propTypes = {
    newProcesses: React.PropTypes.array.isRequired
  }
  constructor () {
    super();
  }

  render () {
    const nodes = this.props.newProcesses.map((process) => {
      return (
        <p>{process.id}</p>
      );
    });
    return (
      <div>
        <h3>new</h3>
        {nodes}
      </div>
    );
  }
}
