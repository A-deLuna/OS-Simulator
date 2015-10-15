import React from 'react';

export default class ListLimits extends React.Component {
  static propTypes = {
    newListLimit: React.PropTypes.number.isRequired,
    readyListLimit: React.PropTypes.number.isRequired,
    waitingListLimit: React.PropTypes.number.isRequired,
    setNewListLimit: React.PropTypes.func.isRequired,
    setReadyListLimit: React.PropTypes.func.isRequired,
    setWaitingListLimit: React.PropTypes.func.isRequired
  }

  handleNew(e) {
    if (e.target.value >= 0) {
      this.props.setNewListLimit(e.target.value);
    }
  }

  handleReady(e) {
    if (e.target.value >= 0) {
      this.props.setReadyListLimit(e.target.value);
    }
  }

  handleWaiting(e) {
    if (e.target.value >= 0) {
      this.props.setWaitingListLimit(e.target.value);
    }
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-5'>
            <span>hold list limit:</span>
          </div>
          <div className='col-md-3'>
            <input type='number' value={this.props.newListLimit}
              onChange={this.handleNew.bind(this)}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-5'>
            <span>ready list limit:</span>
          </div>
          <div className='col-md-3'>
            <input type='number' value={this.props.readyListLimit}
                               onChange={this.handleReady.bind(this)}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-5'>
            <span>waitingIO list limit:</span>
          </div>
          <div className='col-md-3'>
            <input type='number' value={this.props.waitingListLimit}
                               onChange={this.handleWaiting.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}
