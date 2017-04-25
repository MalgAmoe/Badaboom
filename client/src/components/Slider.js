import React, { Component } from 'react'

const styles = {
  slider: {
    margin: 25,
  },
  sliderContainer: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

class Slider extends Component{
  state = {
    value: this.props.default
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.default
    })
  }

  changeValue = (e) => {
    this.setState({value: e.target.value})
    this.props.change(e.target.value)
  }

  render() {
    return (
      <div style={styles.sliderContainer}>
        <span>{this.props.name}: {this.state.value}</span>
        <input
          style={styles.slider}
          type='range' min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          onChange={this.changeValue}/>
      </div>
    )
  }
}

export default Slider
