import React from 'react';

export default class FinishedList extends React.Component {
  static propTypes = {
    finishedProcesses: React.PropTypes.array.isRequired
  }
  constructor () {
    super();
  }

  render () {
    const nodes = this.props.finishedProcesses.map(process => {
      return (
        <p> P{process.id}</p>
      );
    });
    return (
      <div>
        <h3>finished</h3>
        {nodes}
      </div>
    );
  }
}
