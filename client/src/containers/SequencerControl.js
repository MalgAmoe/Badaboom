import React, { Component } from 'react';
import Timeline from './Timeline'
import Start from '../components/Start'
import Slider from '../components/Slider'

const styles = {
  seqContainer: {
    width: '100%',
    backgroundColor: 'black',
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeline: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliders: {

  }
}

class SequencerControl extends Component{
  state = {
    steps: this.props.sequencer
  }
  render() {
    return (
      <div style={styles.seqContainer}>
        <div style={styles.sliders}>
          <Slider max={8}/>
          <Slider max={16}/>
        </div>
        <div style={styles.timeline}>
          <Start action={'Play'} />
          <Timeline steps={this.state.steps} addStep={this.props.addStep}/>
        </div>
      </div>
    )
  }
}

export default SequencerControl
