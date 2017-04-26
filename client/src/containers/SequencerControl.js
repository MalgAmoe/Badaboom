import React, { Component } from 'react';
import Timeline from './Timeline'
import StepParameter from '../components/StepParameter'

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
  sync: {
    color: 'black',
    cursor: 'pointer',
    fontSize: 'x-large',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5
  }
}

class SequencerControl extends Component{

  filterSteps = (step, index) => {
    return index < this.props.sequencer.division
  }

  render() {
    return (
      <div style={styles.seqContainer}>
        <div style={styles.style}>
          <StepParameter
            functionality='Resolution'
            selected={this.props.sequencer.resolution}
            change={this.props.changeResolution}/>
          <div
            onClick={this.props.sync}
            style={styles.sync}>Sync</div>
          <StepParameter
            functionality='Steps'
            selected={this.props.sequencer.division}
            change={this.props.changeStepNumber}/>
        </div>
        <div style={styles.style}>
          <Timeline
            steps={this.props.sequencer.steps.filter((step, index) => this.filterSteps(step, index))}
            addStep={this.props.addStep}/>
        </div>
      </div>
    )
  }
}

export default SequencerControl
