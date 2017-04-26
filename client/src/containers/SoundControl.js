import React, { Component } from 'react';
import XyPad from '../components/Xy'
import SoundSelector from './SoundSelector'
import TransportControl from './TransportControl'

const styles = {
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
        <TransportControl
          tempo={this.props.tempo}
          changeTempo={this.props.changeTempo}
          startStop={this.props.startStop}/>
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
