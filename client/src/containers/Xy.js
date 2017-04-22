import  React, { Component } from 'react';

const styles = {
  pad: {
    width: 300,
    height: 300,
    backgroundColor: 'red'
  }
}

class XyPosition extends Component {

}

class XyPad extends Component {
  state = {
    touched: false
  }

  logPosition(pos) {
    console.log(`x:${pos.nativeEvent.offsetX/styles.pad.width}`
      + ` y:${1 - pos.nativeEvent.offsetY/styles.pad.width}`);
  }

  modifySound = (e) => {
    const type = e.type
    switch (type) {
      case 'mousedown':
        this.logPosition(e)
        this.setState({touched: true})
        break
      case 'mousemove':
        if (this.state.touched) {
          this.logPosition(e)
        }
        break
      default:
        this.setState({touched: false})
    }
  }

  render () {
    return (
      <div style={styles.pad}
        onMouseDown={this.modifySound}
        onMouseUp={this.modifySound}
        onMouseLeave={this.modifySound}
        onMouseMove={this.modifySound}>
      </div>
    )
  }
}

export default XyPad
