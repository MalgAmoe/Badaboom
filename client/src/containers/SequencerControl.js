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
  style: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}

class SequencerControl extends Component{

  filterSteps = (step, index) => {
    return index < this.props.sequencer.division
  }

  render() {
    return (
      <div style={styles.seqContainer}>
        <div style={styles.style}>
          <Slider
            name='Resolution'
            max={16}
            default={this.props.sequencer.resolution}
            change={this.props.changeResolution}/>
          <Slider
            name='Steps'
            max={16}
            default={this.props.sequencer.division}
            change={this.props.changeStepNumber}/>
        </div>
        <div style={styles.style}>
          <Start
            startStop={this.props.startStop}/>
          <Timeline
            steps={this.props.sequencer.steps.filter((step, index) => this.filterSteps(step, index))}
            addStep={this.props.addStep}/>
        </div>

      </div>
    )
  }
}

export default SequencerControl
