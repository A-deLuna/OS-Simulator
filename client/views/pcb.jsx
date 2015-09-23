import React from 'react';

export default class PCB extends React.Component {
  static propTypes = {
    processes: React.PropTypes.object.isRequired
  }
  constructor() {
    super();
  }

  render () {
    const processes = this.props.processes;

    const array = [...processes.newProcesses,
      ...processes.readyProcesses,
      processes.runningProcess,
      ...processes.waitingIOProcesses,
      processes.usingIOProcess,
      ...processes.finishedProcesses];

    const nodes = array.map((process) => {
      return (
        <tr>
          <td>P {process.id}</td>
          <td>{process.arrivalTime}</td>
          <td>{process.totalCPUTime}</td>
          <td>{process.currentCPUTime}</td>
          <td>{process.IOTime}</td>
        </tr>
      );
    });

    return (
      <div>
        <h1>PCB</h1>
        <table className='table table-bordered'>
          <tr>
            <th>id</th>
            <th>tiempo de llegada</th>
            <th>uso de cpu</th>
            <th>tiempo acum. de uso</th>
            <th>hora de uso de I/O</th>
          </tr>
          <tbody>
          {nodes}
          </tbody>
        </table>
      </div>
    );
  }
}
