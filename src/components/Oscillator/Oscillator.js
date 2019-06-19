import React, { PureComponent } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import webaudio from '../../services/webaudio';

class Oscillator extends PureComponent{

  state = {
    type: 'sine',
    osc: null,
    context: this.props.context,
    id: this.props.id,
    nodes: [
      {
        type: 'gain'
      }
    ],
    isPlaying: false
  };

  async componentDidMount() {
    const { context, type } = this.state;
    const osc = webaudio.addOscillator(context, type, 220);
    await this.setState({osc})
    const gainNode = webaudio.addGainNode(context);
    osc.start();
    webaudio.connectToNode(osc, gainNode)
  }
  async componentWillUnmount() {
    const { osc } = this.state;
    osc.disconnect();
  }
  remove() {
    this.props.removeNode(this.state.id);
  }
  changeType(e) {
    const { osc } = this.state;
    this.setState({type: e.target.value});
    osc.type = e.target.value;
  }
  playFrequency(freq) {
    if(!this.state.isPlaying) {
      const { context, osc } = this.state;
      osc.frequency.value = freq;
      this.setState({isPlaying: true})
      osc.connect(context.destination)
      setTimeout(() => {
        this.setState({isPlaying: false})
        osc.disconnect();
      }, 1000)
    }
  }
  render() {
    return (
      <div className="Oscillator">
        <div className="Oscillator__head">
          Oscillator name
        </div>
        <div className="Oscillator__body">
          <select name="type" id="" onChange={(e) => this.changeType(e)}>
            <option value="sine">SINE</option>
            <option value="square">SQUARE</option>
            <option value="triangle">TRIANGLE</option>
            <option value="sawtooth">SAWTOOTH</option>
          </select>
          <Keyboard keys={3} playFn={(freq) => this.playFrequency(freq)} />
          <button onClick={() => this.remove()}>REMOVE ME</button>
        </div>
      </div>
    )
  }
}

export default Oscillator;