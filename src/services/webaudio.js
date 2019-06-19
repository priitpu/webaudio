const webaudio = {
  start () {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = new AudioContext();
    return audio;
  },
  connectToNode (from, to) {
    return from.connect(to);
  },
  connectToDestination (ctx, node) {
    return node.connect(ctx.destination);
  },
  addGainNode(ctx) {
    const gainNode = ctx.createGain();
    gainNode.gain.value = 1;
    return gainNode;
  },
  addOscillator(ctx, type, freq) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    return osc;
  },
  removeNode(ctx, node) {
    ctx.disconnect(node);
  }
}

export default webaudio;