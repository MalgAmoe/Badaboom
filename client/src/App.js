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

class App extends Component {
  render() {
    return (
      <div style={styles.mainContainer}>
        <SoundControl style={styles.soundControl}/>
        <SequencerControl style={styles.sequencerControl}/>
      </div>
    );
  }
}

const audioContext = new AudioContext()

let tempo = 120
// const scheduleWindow = 0.12
// const scheduleInterval = 100

let kickSequencer = new Sequencer(1, 16, tempo, playKick, audioContext)
kickSequencer.setStep(0, 1)
kickSequencer.setStep(1, 0.1)
kickSequencer.setStep(2, 0.2)
kickSequencer.setStep(3, 0.1)
kickSequencer.setStep(4, 0.5)
kickSequencer.setStep(5, 0.1)
kickSequencer.setStep(6, 0.2)
kickSequencer.setStep(7, 0.1)
kickSequencer.setStep(8, 0.5)
kickSequencer.setStep(9, 0.1)
kickSequencer.setStep(10, 0.2)
kickSequencer.setStep(11, 0.1)
kickSequencer.setStep(12, 0.5)
kickSequencer.setStep(13, 0.1)
kickSequencer.setStep(14, 0.2)
kickSequencer.setStep(15, 0.1)

let scheduler = new Scheduler(tempo, kickSequencer)

scheduler.start()

setTimeout(scheduler.stop, 10000)

// const scheduler = () => {
//   kickSequencer.scheduleSteps(scheduleWindow, audioContext)
// }
//
// console.log(audioContext);
//
// console.log(kickSequencer);
//
// setInterval(scheduler, scheduleInterval)

export default App;
