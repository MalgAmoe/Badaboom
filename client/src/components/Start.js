import React, { Component } from 'react'

const Styles = {
  start: {
    height: 50,
    width: '50%',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    cursor: 'pointer',
    margin: 20
  }
}

class Start extends Component {
  state = {
    started: false,
    color: '#008148',
    action: 'Play'
  }

  toggleStartStop = () => {
    if (this.state.started) {
      this.setState({started: false, color: '#008148', action: 'Play'})
    } else {
      this.setState({started: true, color: '#E53D00', action: 'Stop'})
    }
    this.props.startStop()
  }

  checkTouchOrClick = (e) => {
    if(e.type === 'touchstart') {
      e.preventDefault()
      this.toggleStartStop()
    } else if (e.type === 'mousedown') {
      this.toggleStartStop()
    }
  }

  render() {
    return (
      <div
        style={Object.assign({}, Styles.start, {backgroundColor: this.state.color})}
        onMouseDown={this.checkTouchOrClick}
        >{this.state.action}</div>
    )
  }

}

export default Start
