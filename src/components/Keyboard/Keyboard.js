import React, { PureComponent } from 'react';
import Key from '../Key/Key';

class Keyboard extends PureComponent {
  renderKeys() {
    const { keys } = this.props;
    const keyboard = [];
    const hz = [100, 200, 300];
    for(let i = 0; i < keys; i++) {
      keyboard.push(<Key key={hz[i]} playFn={() => this.props.playFn(hz[i])}/>);
    }
    return keyboard;
  }
  render() {
    return (
      this.renderKeys()
    )
  }
}

export default Keyboard;