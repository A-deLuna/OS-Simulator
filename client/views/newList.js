import React from 'react';

export default class NewList extends React.Component {
  static propTypes = {
    newProcesses: React.PropTypes.array.isRequired
  }

  render () {
    const nodes = this.props.newProcesses.map((process) => {
      return (
        <p key={process.id}>P{process.id}</p>
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
