import React, { PureComponent } from 'react';
import './App.css';
import Synth from './components/Synth/Synth';

class App extends PureComponent {
  state = {
    hasStarted: false
  }
  start() {
    this.setState({hasStarted: true});
  }
  render() {
    const { hasStarted } = this.state;
    return (
      <>
        { hasStarted ? <Synth /> : <button onClick={() => this.start()}>Start</button>}
      </>
    );
  }
}

export default App;
