import React, { Component } from 'react';
import XyPad from '../components/Xy'
import SoundSelector from './SoundSelector'


const styles = {
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 500,
    backgroundColor: 'black',
    opacity: 1
  }
}

class SoundControl extends Component{
  render() {
    const { changeSound, ...rest } = this.props
    return (
      <div style={styles.controls}>
        <XyPad
          changeSound={this.props.changeSound}
          x={this.props.activeSequencer.sound.x}
          y={this.props.activeSequencer.sound.y}/>
        <SoundSelector {...rest} />
      </div>
    )
  }
}

export default SoundControl
