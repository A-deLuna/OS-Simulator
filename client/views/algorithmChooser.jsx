import React from 'react';

export default class AlgorithmChooser extends React.Component {
  static propTypes = {
    enableQuantum: React.PropTypes.func.isRequired,
    disableQuantum: React.PropTypes.func.isRequired
  }

  changeHandler(e) {
    if (e.target.value === 'rr') {
      this.props.enableQuantum();
    }
    if (e.target.value === 'fcfs') {
      this.props.disableQuantum();
    }
  }
  render () {
    const style = {
      paddingRight: 100
    };
    return (
      <div className='row'>
        <div className='col-md-5'>
          Algorithm:
        </div>
        <div className='col-md-7' style={style}>
          <form onChange={this.changeHandler.bind(this)}>
            <div className='form-group'>
              <div className='radio'>
                <input type='radio' name='options' value='rr' defaultChecked/>
                  Round Robin
              </div>
              <div className='radio'>
                <input type='radio' name='options' value='fcfs'/>
                  First Come First Serve
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
