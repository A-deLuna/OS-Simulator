import React from 'react';
import { SpeedChooser } from './speedChooser';

export class Properties extends React.Component {
  static propTypes = {
    slow: React.PropTypes.func.isRequired,
    normal: React.PropTypes.func.isRequired,
    fast: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <SpeedChooser {...this.props} />
      </div>
    );
  }
}
