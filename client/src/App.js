import React, { Component } from 'react';
import SequencerControl from './containers/SequencerControl';
import SoundControl from './containers/SoundControl';

import Sequencer from './lib/Sequencer'
import playKick from './lib/Kick'
import Scheduler from './lib/Scheduler'

import './App.css';

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  soundControl: {
    height:400,
  },
  sequencerControl: {
    flex: 1
  }
}

const audioContext = new AudioContext()

let tempo = 120

let kickSequencer = new Sequencer(4, 16, tempo, playKick, audioContext)

let scheduler = new Scheduler(tempo, kickSequencer, audioContext)



// scheduler.start()
// setTimeout(scheduler.stop, 10000)

class App extends Component {

  addStep = (step, velocity) => {
    kickSequencer.setStep(step, velocity)
  }

  startStop = (started) => {
    if (!started) {
      scheduler.start()
      kickSequencer.start(audioContext)
    } else {
      scheduler.stop()
      kickSequencer.stop()
    }
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <SoundControl style={styles.soundControl}/>
        <SequencerControl
          style={styles.sequencerControl}
          sequencer={kickSequencer.steps}
          addStep={this.addStep}
          startStop={this.startStop}/>
      </div>
    );
  }
}

export default App;
