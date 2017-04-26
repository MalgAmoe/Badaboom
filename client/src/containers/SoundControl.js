import React, { Component } from 'react';
import XyPad from '../components/Xy'
import SoundSelector from './SoundSelector'


const styles = {
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 580,
    backgroundColor: 'black',
    opacity: 1
  },
  text: {
    color: 'white',
  }
}

class SoundControl extends Component{
  render() {
    const { changeSound, ...rest } = this.props
    return (
      <div style={styles.controls}>
        <h1 style={styles.text}>BADABOOM</h1>
        <p style={styles.text}>Go down, press play, push stuff and have fun!!!</p>
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
