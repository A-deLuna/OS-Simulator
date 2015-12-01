import React from 'react';

export default class Memory extends React.Component {
  static propTypes = {
    table : React.PropTypes.array.isRequired
  }
  render () {
    const head = this.props.table.map((elem, i) => {
      return (
          <td>{i}</td>
      );
    });
    const val = this.props.table.map((elem, i) => {
      return (
          <td key={i}>{Number.isInteger(elem) ? 'P' : ''}{elem}</td>
      );
    });
    return (
      <div>
        <h1> Memory </h1>
        <table className='table'>
          <tbody>
            <tr>
              {head}
            </tr>
            <tr>
              {val}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
