import React, { Component } from 'react';
import XyPad from './Xy'
import SoundSelector from './SoundSelector'

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    backgroundColor: 'blue',
    opacity: 0.7
  }
}

class SoundControl extends Component{
  render() {
    return (
      <div style={styles.controls}>
        <XyPad />
      </div>
    )
  }
}

export default SoundControl
