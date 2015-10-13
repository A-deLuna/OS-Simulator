import React from 'react';

export default class ErrorList extends React.Component {
  static propTypes = {
    errorProcesses: React.PropTypes.array.isRequired
  }
  render () {
    const nodes = this.props.errorProcesses.map(process => {
      return (<p key={process.id}>P{process.id}</p>);
    });
    return (
      <div>
        <h3>Error</h3>
        {nodes}
      </div>
    );
  }
}
