import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from './store/reducers'

import SequencerControl from './containers/SequencerControl'
import SoundControl from './containers/SoundControl'

import Sequencer from './lib/Sequencer'
import Kick from './lib/Kick'
import Snare from './lib/Snare'
import Hat from './lib/Hat'
import Scheduler from './lib/Scheduler'

const queryString = require('query-string')

let store = createStore(reducer)
  console.log(store.getState());

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


class App extends Component {
  constructor (props) {
    super(props)
    ReactGA.initialize('UA-98206281-1')
    // ReactGA.pageview(window.location.pathname)
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.initDelays = [{sequencer: 0, step: 0, delay: 0},
                  {sequencer: 1, step: 0, delay: 0},
                  {sequencer: 2, step: 0, delay: 0}]
    this.tempo = 125
    this.kick = new Kick()
    this.kickSequencer = new Sequencer(4, 16, this.tempo, this.kick)
    this.snare = new Snare()
    this.snareSequencer = new Sequencer(4, 16, this.tempo, this.snare)
    this.hat = new Hat()
    this.hatSequencer = new Sequencer(4, 16, this.tempo, this.hat)
    this.sequencers = [this.kickSequencer, this.snareSequencer, this.hatSequencer]
    this.scheduler = new Scheduler(this.tempo, this.sequencers, this.audioContext)
    this.state = {
      started: false,
      tempo: this.tempo,
      steps: this.kickSequencer.steps,
      activeSequencer: this.kickSequencer,
      sequencers: this.sequencers,
      delays: this.initDelays
    }
  }

  componentDidMount() {

    console.log(queryString.parse(location.search));
    if(this.isEmpty(this.props.match.params)) {
      console.log('no props');
    } else {
      console.log(this.props.match.params);

      this.kick.changeSound(this.props.match.params.kx, this.props.match.params.ky)
      this.kickSequencer.changeDivision(this.props.match.params.ksteps)
      this.kickSequencer.changeResolution(this.props.match.params.kbars)

      this.setState({
        tempo:this.props.match.params.tempo,
      })
    }
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
      this.scheduler.start()
      for (let i = 0; i < this.state.sequencers.length; i++) {
        this.state.sequencers[i].startWithDelay(this.audioContext, this.state.delays[i])
      }
    } else {
      this.scheduler.stop()
      this.sequencers.forEach(sequencer => {
        sequencer.stop(this.audioContext)
      })
    }
    this.setState({started: !this.state.started})
  }

  changeResolution = (resolution) => {
    this.state.activeSequencer.changeResolution(resolution)
    this.setState({resolution})
    this.state.activeSequencer.stop()
    this.calculateSequencerOffset()
    this.state.activeSequencer.start(this.audioContext)
  }

  changeStepNumber = (division) => {
    this.state.activeSequencer.changeDivision(division)
    this.updateSteps(this.state.activeSequencer.steps.filter((step, index) => this.filterSteps(step, index)))
    this.state.activeSequencer.stop()
    this.calculateSequencerOffset()
    this.state.activeSequencer.start(this.audioContext)
  }

  calculateSequencerOffset = () => {
    if (this.state.started) {
      const currentTime = this.audioContext.currentTime
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
    this.sequencers.forEach(sequencer => {
      sequencer.changeTempo(tempo)
    })
  }

  sync = () => {
    this.setState({delays: this.initDelays})
    this.sequencers.forEach(sequencer => {
      sequencer.stop()
      sequencer.setDelaySequence(0)
      sequencer.start(this.audioContext)
    })
  }

  isEmpty = (properties) => {
    for (var key in properties) {
      return !properties.hasOwnProperty(key)
    }
    return true
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default App
