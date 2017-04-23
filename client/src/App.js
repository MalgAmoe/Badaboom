import React, { Component } from 'react';
import SequencerControl from './containers/SequencerControl';
import SoundControl from './containers/SoundControl';

import './App.css';

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  soundControl: {
    height:400,
  },
  sequencerControl: {
    flex: 1
  }
}

class App extends Component {
  render() {
    return (
      <div style={styles.mainContainer}>
        <SoundControl style={styles.soundControl}/>
        <SequencerControl style={styles.sequencerControl}/>
      </div>
    );
  }
}

export default App;
