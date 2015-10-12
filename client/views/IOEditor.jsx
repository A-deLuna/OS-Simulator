import React from 'react';

export default class IOEditor extends React.Component {
  static propTypes = {
    IO: React.PropTypes.object.isRequired,
    setIOLimit: React.PropTypes.func.isRequired
  }

  handleChange(e) {
    this.props.setIOLimit(e.target.value.trim());
  }
  render () {
    return (
      <div className='row'>
        <div className='col-md-5'>
          <span>IO time:</span>
        </div>
        <div className='col-md-5'>
          <input type='text' value={this.props.IO.limit}
                             onChange={this.handleChange.bind(this)}/>
        </div>
      </div>
    );
  }
}
