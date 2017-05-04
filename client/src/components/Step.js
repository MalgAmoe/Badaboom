import React, { Component } from 'react'

const styles = {
  step: {
    height: 75,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 2,
    cursor: 'pointer'
  }
}


class Step extends Component {
  state = {
    velocity: 0
  }

  setStep = () => {
    if (this.state.velocity === 0) {
      this.setState({velocity: 0.7})
      this.props.addStep(this.props.stepNum, 0.7)
    } else {
      this.setState({velocity: 0})
      this.props.addStep(this.props.stepNum, 0)
    }
  }

  moveToggle = () => {
    if (this.props.touching) {
      this.setStep()
    }
  }

  changeVelocity = (e) => {
    const type = e.type
    switch (type) {
      case 'mousedown':
        this.setState({touched: true})
        break
      case 'mouseup':
        this.setState({touched: false})
        break
      case 'mousemove':
        const newVelocity = this.state.velocity -e.nativeEvent.movementY/10
        console.log(newVelocity);
        this.setState({velocity: newVelocity})
        break
      default:

    }
  }

  render() {
    return (
      <div
        onMouseDown={this.setStep}
        onMouseOver={this.moveToggle}
        style={Object.assign({}, styles.step, {opacity: this.props.velocity * 0.9 + 0.1})}></div>
    )
  }
}

export default Step
