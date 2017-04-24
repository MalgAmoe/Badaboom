import React, { Component } from 'react'

const Styles = {
  start: {
    height: 75,
    width: 75,
    borderRadius: 20,
    marginLeft: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 5,
    cursor: 'pointer',
  }
}

class Start extends Component {
  state = {
    started: false,
    color: 'green',
    action: 'Play'
  }
  toggleStartStop = () => {
    if (this.state.started) {
      this.setState({started: false, color: 'green', action: 'Play'})
    } else {
      this.setState({started: true, color: 'red', action: 'Stop'})
    }
    this.props.startStop(this.state.started)
  }
  render() {
    return (
      <div
        style={Object.assign({}, Styles.start, {backgroundColor: this.state.color})}
        onClick={this.toggleStartStop}
        >{this.state.action}</div>
    )
  }

}

export default Start
