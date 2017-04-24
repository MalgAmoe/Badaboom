import React, { Component } from 'react';
import XyPad from './Xy'

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    backgroundColor: 'black',
    opacity: 1
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
