import React, { Component } from 'react';

const styles = {
  seqContainer: {
    backgroundColor: 'green'
  }
}

class Sequencer extends Component{
  render() {
    return (
      <div style={styles.seqContainer}>
        <button>yoyo</button>
      </div>
    )
  }
}

export default Sequencer
