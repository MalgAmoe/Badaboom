import React, { Component } from 'react';
import Timeline from './Timeline'
import Start from '../components/Start'
import Slider from '../components/Slider'

const styles = {
  seqContainer: {
    width: '100%',
    backgroundColor: 'green',
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
    steps: [1, 0, 0.5, 0, 1, 0, 0.3, 0, 1, 0, 0.5, 0, 1, 0.8, 0.3, 0]
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
          <Timeline steps={this.state.steps}/>
        </div>
      </div>
    )
  }
}

export default SequencerControl
