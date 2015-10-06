import React from 'react';

export default class AlgorithmChooser extends React.Component {

  changeHandler(e) {
    if (e.target.value === 'rr') {

    }
    if (e.target.value === 'fcfs') {

    }
  }
  render () {
    return (
      <div className='row'>
        <div className='col-md-5'>
          Algorithm:
        </div>
        <div className='col-md-7'>
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
