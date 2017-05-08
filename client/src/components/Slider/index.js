import React, { Component } from 'react'
import './style.css'

const styles = {
  slider: {
    margin: 25,
  },
  sliderContainer: {
    color: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300
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
    e.preventDefault()
    this.setState({value: e.target.value})
    this.props.change(e.target.value)
  }

  render() {
    return (
      <div style={styles.sliderContainer}>
        <span>{this.state.value} {this.props.name}</span>
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
