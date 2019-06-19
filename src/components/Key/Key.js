import React, { PureComponent } from 'react';

class Key extends PureComponent {
  state = {
    hz: this.props.hz
  }
  playFrequency() {
    this.props.playFn();
  }
  render() {
    return (
      <button className="Key" onClick={() => this.playFrequency()}>KEY</button>
    )
  }
};

export default Key;