import React from 'react';
import NewList from './newList';
import ReadyList from './readyList';
import RunningView from './runningView';
import FinishedList from './finishedList';

export default class Lists extends React.Component {
  static propTypes = {
    processes: React.PropTypes.object.isRequired
  }
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <h1> Listas </h1>
        <NewList newProcesses={this.props.processes.newProcesses}/>
        <ReadyList readyProcesses={this.props.processes.readyProcesses}/>
        <RunningView runningProcess={this.props.processes.runningProcess}/>
        <FinishedList finishedProcesses={this.props.processes.finishedProcesses}/>
      </div>
    );
  }
}
