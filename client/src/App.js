import React, { Component } from 'react'

import ReactGA from 'react-ga'
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
let tempo = 125
let initDelays = [{sequencer: 0, step: 0, delay: 0},
              {sequencer: 1, step: 0, delay: 0},
              {sequencer: 2, step: 0, delay: 0}]
const kick = new Kick()
const kickSequencer = new Sequencer(4, 16, tempo, kick)
const snare = new Snare()
const snareSequencer = new Sequencer(4, 16, tempo, snare)
const hat = new Hat()
const hatSequencer = new Sequencer(4, 16, tempo, hat)
const sequencers = [kickSequencer, snareSequencer, hatSequencer]
const scheduler = new Scheduler(tempo, sequencers, audioContext)

class App extends Component {
  constructor () {
    super()
    ReactGA.initialize('UA-98206281-1')
    // ReactGA.pageview(window.location.pathname)
  }

  state = {
    started: false,
    tempo: tempo,
    steps: kickSequencer.steps,
    activeSequencer: kickSequencer,
    sequencers: sequencers,
    delays: initDelays
  }

  addStep = (step, velocity) => {
    this.state.activeSequencer.setStep(step, velocity)
    this.updateSteps(this.state.activeSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
  }

  updateSteps = (newSteps) => {
    this.setState({steps: newSteps})
  }

  startStop = () => {
    if (!this.state.started) {
      scheduler.start()
      for (let i = 0; i < this.state.sequencers.length; i++) {
        this.state.sequencers[i].startWithDelay(audioContext, this.state.delays[i])
      }
    } else {
      scheduler.stop()
      sequencers.forEach(sequencer => {
        sequencer.stop(audioContext)
      })
    }
    this.setState({started: !this.state.started})
  }

  changeResolution = (resolution) => {
    this.state.activeSequencer.changeResolution(resolution)
    this.setState({resolution})
    this.state.activeSequencer.stop()
    this.calculateSequencerOffset()
    this.state.activeSequencer.start(audioContext)
  }

  changeStepNumber = (division) => {
    this.state.activeSequencer.changeDivision(division)
    this.updateSteps(this.state.activeSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
    this.state.activeSequencer.stop()
    this.calculateSequencerOffset()
    this.state.activeSequencer.start(audioContext)
  }

  calculateSequencerOffset = () => {
    if (this.state.started) {
      const currentTime = audioContext.currentTime
      let newDelays = [{sequencer: 0, step: 0, delay: 0}]

      if (this.state.activeSequencer === this.state.sequencers[0]) {
        for (let i = 1; i < this.state.sequencers.length; i++) {
          let step = this.state.sequencers[i].currentStep
          let delay = this.state.sequencers[i].nextStepTime - currentTime

          newDelays.push({sequencer: i, step: step, delay: delay})
        }
      } else {
        const currentStep1 = this.state.sequencers[0].currentStep
        const nextStepTime1 = this.state.sequencers[0].nextStepTime
        const t01 = nextStepTime1 - (currentStep1) * this.state.sequencers[0].timeLag
        let t0n = currentTime
        let step = this.state.activeSequencer.division
        while (t0n > t01) {
          t0n -= this.state.activeSequencer.timeLag
          step--
          if (step < 0) step = this.state.activeSequencer.division - 1
        }
        let delay = t0n - t01

        for (let i = 1; i < this.state.sequencers.length; i++) {
          if (this.state.sequencers[i] === this.state.activeSequencer) {
            newDelays.push({sequencer: i, step: step, delay: delay})
          } else {
            newDelays.push(this.state.delays[i])
          }
        }
      }
      this.setState({delays: newDelays})
    }
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
    this.setState({delays: initDelays})
    sequencers.forEach(sequencer => {
      sequencer.stop()
      sequencer.setDelaySequence(0)
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
