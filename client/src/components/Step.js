import React, { Component } from 'react'

const styles = {
  step: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 2
  }
}


class Step extends Component {
  state = {
    velocity: 0
  }
  
  setStep = () => {
    this.setState({velocity: 1})
    this.props.addStep(this.props.stepNum, 1)
  }

  eraseStep = () => {
    this.setState({velocity: 0})
    this.props.addStep(this.props.stepNum, 0)
  }

  render() {
    return (
      <div onClick={this.setStep} onDoubleClick={this.eraseStep} style={Object.assign({}, styles.step, {opacity: this.state.velocity * 0.9 + 0.1})}></div>
    )
  }
}

export default Step
