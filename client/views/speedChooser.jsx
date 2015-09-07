import React from 'react';

export class SpeedChooser extends React.Component {
  static propTypes = {
    slow: React.PropTypes.func.isRequired,
    normal: React.PropTypes.func.isRequired,
    fast: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className="btn-group">
        <button className="btn btn-default" onClick={::this.props.slow}>Slow</button>
        <button className="btn btn-default" onClick={::this.props.normal}>Normal</button>
        <button className="btn btn-default" onClick={::this.props.fast}>Fast</button>
      </div>
    );
  }
}
