import React, { Component } from 'react';
import XyPad from '../components/Xy'
import SoundSelector from './SoundSelector'

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
        <SoundSelector />
        <XyPad changeSound={this.props.changeSound}/>
      </div>
    )
  }
}

export default SoundControl
