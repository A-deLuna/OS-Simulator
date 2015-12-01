import React from 'react';

export default class TAP extends React.Component {
  static propTypes = {
    processes: React.PropTypes.object.isRequired
  }

  render () {
    const processes = this.props.processes;

    let array = [
      ...processes.readyProcesses,
      processes.runningProcess,
      ...processes.waitingIOProcesses,
      processes.usingIOProcess
    ];

   // filter empty objects with the mighty cast to bool... aka dirty hack :3
    array = array.filter(a => {return !!a.id; });

    array.sort((a, b) => { return a.id - b.id; });

    const nodes = array.map((process) => {
      return (
        <tr key={process.id}>
        <td><b>{process.id}</b></td>
        {
          process.frameList.map((item) => {
            let msg;
            switch (item) {
            case 'DISK': msg = 'DK';
              break;
            default: msg = 'pene';
            }
            if (Number.isInteger(item)) {
              msg = item;
            }
            return (<td>{msg}</td>);
          })
        }
        </tr>
      );
    });

    return (
      <div>
        <h1>TAP</h1>
        <table className='table'>
        {nodes}
        </table>
      </div>
    );
  }
}
