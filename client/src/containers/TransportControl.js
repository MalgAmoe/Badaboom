import React, { Component } from 'react'

import Start from '../components/Start'
import Slider from '../components/Slider'

const styles = {
  transport: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

class TransportControl extends Component {
  render() {
    return (
      <div style={styles.transport}>
        <Slider
          name='BPM'
          max={200}
          min={50}
          default={this.props.tempo}
          change={this.props.changeTempo}/>
        <Start
          startStop={this.props.startStop}/>
      </div>
    )
  }
}

export default TransportControl
