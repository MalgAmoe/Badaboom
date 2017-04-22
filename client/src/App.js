import React, { Component } from 'react';
import Sequencer from './containers/Sequencer';
import SoundControl from './containers/SoundControl';

import './App.css';

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    bottom: 0
  },
  soundControl: {
    height:400,
  },
  sequencer: {
    flex: 1,
    borderStyle: 'solid'
  }
}

class App extends Component {
  render() {
    return (
      <div style={styles.mainContainer}>
        <SoundControl style={styles.soundControl}/>
        <Sequencer style={styles.sequencer}/>
      </div>
    );
  }
}

export default App;
