import React, { Component } from 'react'

const styles = {
  selector: {
    height: 55,
    width: 55,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    cursor: 'pointer',
    margin: 10,
    color: 'black'
  }
}

class Selector extends Component {
  state = {
    selected: this.props.selected
  }
  render() {
    return (
      <div onClick={this.props.onClick} style={Object.assign({}, styles.selector, {
        backgroundColor: this.props.selected ? 'white' : 'grey'
      })}>{this.props.sound}</div>
    )
  }
}

export default Selector
