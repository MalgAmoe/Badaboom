import React, { Component } from 'react'
import Selector from '../components/Selector'

const styles = {
  selectorContainer: {
    display: 'flex',
    flexDirection: 'column',
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
    cursor: 'pointer',
  }
}

class SoundSelector extends Component {
  render() {
    this.state = {

    }
    return(
      <div style={styles.selectorContainer}>
        <Selector sound='Kick' selected={true}/>
        <Selector sound='Snare' selected={false}/>
      </div>
    )
  }
}

export default SoundSelector
