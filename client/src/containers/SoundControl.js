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
    const { changeSound, ...rest } = this.props
    return (
      <div style={styles.controls}>
        <SoundSelector {...rest} />
        <XyPad
          changeSound={this.props.changeSound}
          x={this.props.activeSequencer.sound.x}
          y={this.props.activeSequencer.sound.y}/>
      </div>
    )
  }
}

export default SoundControl
