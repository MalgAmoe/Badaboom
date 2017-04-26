import React, { Component } from 'react'
import Selector from '../components/Selector'

const styles = {
  selectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    height: 75,
    width: 75,
    borderRadius: 20,
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 5,
    cursor: 'pointer'
  }
}

class SoundSelector extends Component {
  renderSequencers = () => {
    return this.props.sequencerList.map((sequencer, i) => {
      return (
        <Selector
          key={i}
          sound={sequencer.sound.constructor.name}
          selected={sequencer === this.props.activeSequencer}
          onClick={() => this.props.changeSequencer(sequencer)}/>
      )
    })
  }
  render() {
    this.state = {

    }
    return(
      <div style={styles.selectorContainer}>
        {this.renderSequencers()}
      </div>
    )
  }
}

export default SoundSelector
