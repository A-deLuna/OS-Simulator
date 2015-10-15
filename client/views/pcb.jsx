import React from 'react';

export default class PCB extends React.Component {
  static propTypes = {
    processes: React.PropTypes.object.isRequired
  }

  render () {
    const processes = this.props.processes;

    let array = [...processes.newProcesses,
      ...processes.readyProcesses,
      processes.runningProcess,
      ...processes.waitingIOProcesses,
      processes.usingIOProcess,
      ...processes.finishedProcesses,
      ...processes.errorProcesses];

   // filter empty objects with the mighty cast to bool... aka dirty hack :3
    array = array.filter(a => {return !!a.id; });

    array.sort((a, b) => { return a.id - b.id; });

    const nodes = array.map((process) => {
      const sistemTime = process.finishedTime - process.arrivalTime + 1;
      const waitingTime = sistemTime - process.totalCPUTime - process.IOTime;
      return (
        <tr key={process.id}>
          <td>P{process.id}</td>
          <td>{process.arrivalTime}</td>
          <td>{process.totalCPUTime}</td>
          <td>{process.currentCPUTime}</td>
          <td>{process.IOTime}</td>
          <td>{process.IOGoalTime !== 0 ? process.IOGoalTime : ''}</td>
          <td>{process.finishedTime !== 0 ? process.finishedTime : ''}</td>
          <td>{process.finishedTime !== 0 ? sistemTime : ''}</td>
          <td>{process.finishedTime !== 0 ? waitingTime : ''}</td>
        </tr>
      );
    });

    return (
      <div className ='bg-success'>
        <h1>PCB</h1>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>id</th>
              <th>tiempo de llegada</th>
              <th>uso de cpu</th>
              <th>tiempo acum. de uso</th>
              <th>hora de uso de I/O</th>
              <th>tiempo de uso de I/O</th>
              <th>tiempo de finalizacion</th>
              <th>tiempo en el sistema</th>
              <th>tiempo de espera</th>
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
