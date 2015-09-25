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

    let array = [...processes.newProcesses,
      ...processes.readyProcesses,
      processes.runningProcess,
      ...processes.waitingIOProcesses,
      processes.usingIOProcess,
      ...processes.finishedProcesses];

   // filter empty objects with the mighty cast to bool... aka dirty hack :3
    array = array.filter(a => {return !!a.id; });

    array.sort((a, b) => { return a.id - b.id; });

    const nodes = array.map((process) => {
      return (
        <tr key={process.id}>
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
          <thead>
            <tr>
              <th>id</th>
              <th>tiempo de llegada</th>
              <th>uso de cpu</th>
              <th>tiempo acum. de uso</th>
              <th>hora de uso de I/O</th>
            </tr>
          </thead>
          <tbody>
          {nodes}
          </tbody>
        </table>
      </div>
    );
  }
}
