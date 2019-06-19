import React, { PureComponent } from 'react';
import webaudio from '../../services/webaudio';
import Keyboard from '../Keyboard/Keyboard';
import Oscillator from '../Oscillator.js/Oscillator';
import { oscillatorId } from '../../services/idGenerator';

class Synth extends PureComponent {
  state = {
    context: webaudio.start(),
    sources: [],
    nodes: []
  }
  addSource() {
    const source = {
      id: oscillatorId.next().value,
    }
    const sources = [...this.state.sources, source];
    this.setState({sources})
  }
  addNode(node) {
    const nodes = [...this.state.nodes, node];
    this.setState({nodes})
  }
  removeSource(id) {
    const sources = this.state.sources.filter(e => e.id !== id);
    this.setState({sources});
  }
  addOscillator() {
    const osc = webaudio.addOscillator(this.state.audio, 'sine', 440);
    const sources = [...this.state.sources, osc];
    this.setState({sources})
    const gainNode = webaudio.addGainNode(this.state.audio);
    const nodes = [...this.state.nodes, gainNode];
    this.setState({nodes});
    webaudio.connectToNode(osc, gainNode);
    webaudio.connectToDestination(this.state.audio, gainNode);
    osc.start();
    osc.stop(this.state.context.currentTime + 1);
  }
  render(){
    const { context } = this.state;
    return (
      <>
      <button onClick={() => this.addSource()}>add source</button>
      {this.state.sources.map((source) => {
        return (
          <Oscillator
            context={context}
            addNode={(node) => this.addNode(node)}
            removeNode={(id) => this.removeSource(id)}
            id={source.id}
            key={source.id}
          />
        )
      })}
      </>
    )
  }
}

export default Synth;