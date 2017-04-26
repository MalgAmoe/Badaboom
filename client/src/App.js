import React, { Component } from 'react'
import SequencerControl from './containers/SequencerControl'
import SoundControl from './containers/SoundControl'

import Sequencer from './lib/Sequencer'
import Kick from './lib/Kick'
import Snare from './lib/Snare'
import Hat from './lib/Hat'
import Scheduler from './lib/Scheduler'

import './App.css'

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  soundControl: {
    height:400,
  },
  sequencerControl: {
    heihgt: 400
  }
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)()
let tempo = 120
const kick = new Kick()
const kickSequencer = new Sequencer(4, 16, tempo, kick, audioContext)
const snare = new Snare()
const snareSequencer = new Sequencer(4, 16, tempo, snare, audioContext)
const hat = new Hat()
const hatSequencer = new Sequencer(4, 16, tempo, hat, audioContext)
const sequencers = [kickSequencer, snareSequencer, hatSequencer]
const scheduler = new Scheduler(tempo, sequencers, audioContext)

class App extends Component {

  state = {
    tempo: tempo,
    steps: kickSequencer.steps,
    activeSequencer: kickSequencer,
    sequencers: sequencers
  }

  addStep = (step, velocity) => {
    this.state.activeSequencer.setStep(step, velocity)
    this.updateSteps(this.state.activeSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
  }

  updateSteps = (newSteps) => {
    this.setState({steps: newSteps})
  }

  startStop = (started) => {
    if (!started) {
      scheduler.start()
      sequencers.forEach(sequencer => {
        sequencer.start(audioContext)
      })
    } else {
      scheduler.stop()
      sequencers.forEach(sequencer => {
        sequencer.stop(audioContext)
      })
    }
  }

  changeResolution = (resolution) => {
    this.state.activeSequencer.changeResolution(resolution)
    this.setState({resolution})
    this.state.activeSequencer.stop()
    this.state.activeSequencer.start(audioContext)
  }

  changeStepNumber = (division) => {
    this.state.activeSequencer.changeDivision(division)
    this.updateSteps(this.state.activeSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
    this.state.activeSequencer.stop()
    this.state.activeSequencer.start(audioContext)
  }

  filterSteps = (step, index) => {
    return index < this.state.activeSequencer.division
  }

  changeSound = (x, y) => {
    this.state.activeSequencer.sound.changeSound(x, y)
  }

  changeSequencer = (sequencer) => {
    this.setState({activeSequencer: sequencer})
  }

  changeTempo = (tempo) => {
    this.setState({tempo: tempo})
    sequencers.forEach(sequencer => {
      sequencer.changeTempo(tempo)
    })
  }

  sync = () => {
    sequencers.forEach(sequencer => {
      sequencer.stop()
      sequencer.start(audioContext)
    })
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <SoundControl
          changeSound={this.changeSound}
          sequencerList={this.state.sequencers}
          changeSequencer={this.changeSequencer}
          activeSequencer={this.state.activeSequencer}/>
        <SequencerControl
          style={styles.sequencerControl}
          startStop={this.startStop}
          tempo={this.state.tempo}
          changeTempo={this.changeTempo}
          sequencer={this.state.activeSequencer}
          addStep={this.addStep}
          changeStepNumber={this.changeStepNumber}
          changeResolution={this.changeResolution}
          sync={this.sync}/>
      </div>
    )
  }
}

export default App
