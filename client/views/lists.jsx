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
        <div className='col-md-2'>
          <NewList newProcesses={this.props.processes.newProcesses}/>
        </div>
        <div className='col-md-2'>
          <ReadyList readyProcesses={this.props.processes.readyProcesses}/>
        </div>
        <div className='col-md-2'>
          <RunningView runningProcess={this.props.processes.runningProcess}/>
        </div>
        <div className='col-md-2'>
          <FinishedList finishedProcesses={this.props.processes.finishedProcesses}/>
        </div>
      </div>
    );
  }
}
