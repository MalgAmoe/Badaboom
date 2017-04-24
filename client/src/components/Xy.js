import  React, { Component } from 'react';

const styles = {
  pad: {
    position: 'relative',
    width: 300,
    height: 300,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    opacity: 0.9,
    cursor: 'pointer'
  },
  position: {
    position: 'absolute',
    width: 20,
    height: 20,
    margin: -10,
    borderRadius:10,
    backgroundColor: 'yellow',
    opacity: 0.9,
    pointerEvents: 'none'
  }
}

class XyPosition extends Component {
  render() {
    return (
      <div style={Object.assign({}, styles.position, {top: this.props.top, left: this.props.left})}></div>
    )
  }
}

class XyPad extends Component {
  state = {
    touched: false,
    x:0.5,
    y:0.5,
    left:styles.pad.width * 0.5,
    top:styles.pad.width * 0.5
  }

  changePosition(pos) {
    this.setState({left:pos.nativeEvent.offsetX, top:pos.nativeEvent.offsetY})
    this.setState({x:pos.nativeEvent.offsetX/styles.pad.width, y:1 - pos.nativeEvent.offsetY/styles.pad.width})
  }

  modifySound = (e) => {
    const type = e.type
    switch (type) {
      case 'mousedown':
        this.changePosition(e)
        this.setState({touched: true})
        break
      case 'mousemove':
        if (this.state.touched) {
          // console.log(e.nativeEvent);
          this.changePosition(e)
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
        <XyPosition top={this.state.top} left={this.state.left}/>
      </div>
    )
  }
}

export default XyPad
