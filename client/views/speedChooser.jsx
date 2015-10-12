import React from 'react';

export class SpeedChooser extends React.Component {
  static propTypes = {
    slow: React.PropTypes.func.isRequired,
    normal: React.PropTypes.func.isRequired,
    fast: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='row'>
        <div className='col-md-4'>
          <span>Clock Speed: </span>
        </div>
          <div className="btn-group col-md-8">
            <button className="btn btn-success" onClick={::this.props.slow}>Slow</button>
            <button className="btn btn-warning" onClick={::this.props.normal}>Normal</button>
            <button className="btn btn-danger" onClick={::this.props.fast}>Fast</button>
          </div>

      </div>
    );
  }
}
