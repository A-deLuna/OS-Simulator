import React from 'react';

export default class Memory extends React.Component {
  static propTypes = {
    table : React.PropTypes.array.isRequired,
    highlighted : React.PropTypes.number.isRequired
  }
  render () {
    const head = this.props.table.map((elem, i) => {
      return (
          <td>{i}</td>
      );
    });
    const val = this.props.table.map((elem, i) => {
      const style = i === this.props.highlighted ? {backgroundColor: 'red'} : null;
      return (
          <td key={i} style={style}>{Number.isInteger(elem.val) ? 'P' : ''}{elem.val}</td>
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
