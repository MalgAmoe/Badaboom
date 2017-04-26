import React, { Component } from 'react';
import Timeline from './Timeline'
import StepParameter from '../components/StepParameter'
import TransportControl from './TransportControl'

const styles = {
  seqContainer: {
    width: '100%',
    backgroundColor: 'black',
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  timeline: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  style: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sync: {
    color: 'black',
    cursor: 'pointer',
    fontSize: 'x-large',
    backgroundColor: 'grey',
    padding: 10,
    margin: 10,
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
        <div style={styles.timeline}>
          <Timeline
            steps={this.props.sequencer.steps.filter((step, index) => this.filterSteps(step, index))}
            addStep={this.props.addStep}/>
        </div>
        <div style={styles.style} className={'parametersDirection'}>
          <StepParameter
            functionality='Steps'
            selected={this.props.sequencer.division}
            change={this.props.changeStepNumber}/>
          <div
            onClick={this.props.sync}
            style={styles.sync}>Sync</div>
          <StepParameter
            functionality='Bars'
            selected={this.props.sequencer.resolution}
            change={this.props.changeResolution}/>
        </div>
        <TransportControl
          tempo={this.props.tempo}
          changeTempo={this.props.changeTempo}
          startStop={this.props.startStop}/>
      </div>
    )
  }
}

export default SequencerControl
