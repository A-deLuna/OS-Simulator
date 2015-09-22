import React from 'react';
export default class RunningView extends React.Component {
  static propTypes = {
    runningProcess: React.PropTypes.object.isRequired
  }
  constructor() {
    super();
  }

  render () {
    return (
        <div>
          <h3>Running</h3>
          <p>{this.props.runningProcess.id}</p>
        </div>
    );
  }
}
