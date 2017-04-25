import React, { Component } from 'react'

const styles = {
  selector: {
    height: 55,
    width: 55,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    cursor: 'pointer',
    margin: 10,
    marginRight: 100
  }
}

class Selector extends Component {
  state = {
    selected: this.props.selected
  }
  render() {
    return (
      <div onClick={this.props.onClick} style={Object.assign({}, styles.selector, {
        backgroundColor: this.props.selected ? 'white' : 'grey',
        color: this.props.selected ? 'grey' : 'white'
      })}>{this.props.sound}</div>
    )
  }
}

export default Selector
