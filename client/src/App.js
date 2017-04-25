import React, { Component } from 'react'
import SequencerControl from './containers/SequencerControl'
import SoundControl from './containers/SoundControl'

import Sequencer from './lib/Sequencer'
import Kick from './lib/Kick'
import Snare from './lib/Snare'
import Scheduler from './lib/Scheduler'

import './App.css'

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
let kick = new Snare()
let kickSequencer = new Sequencer(4, 16, tempo, kick, audioContext)
let scheduler = new Scheduler(tempo, kickSequencer, audioContext)

class App extends Component {

  state = {
    steps: kickSequencer.steps
  }

  addStep = (step, velocity) => {
    kickSequencer.setStep(step, velocity)
    this.updateSteps(kickSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
  }

  updateSteps = (newSteps) => {
    this.setState({steps: newSteps})
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

  changeResolution = (resolution) => {
    kickSequencer.changeResolution(resolution)
  }

  changeStepNumber = (division) => {
    kickSequencer.changeDivision(division)
    this.updateSteps(kickSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
  }

  filterSteps = (step, index) => {
    return index < kickSequencer.division
  }

  changeSound = (x, y) => {
    kick.changeSound(x, y)
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <SoundControl
          style={styles.soundControl}
          changeSound={this.changeSound}/>
        <SequencerControl
          style={styles.sequencerControl}
          sequencer={this.state.steps}
          addStep={this.addStep}
          startStop={this.startStop}
          changeStepNumber={this.changeStepNumber}
          changeResolution={this.changeResolution}/>
      </div>
    )
  }
}

export default App
