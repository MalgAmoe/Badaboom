import  React, { Component } from 'react';

const styles = {
  pad: {
    position: 'relative',
    width: 300,
    height: 300,
    borderRadius: 5,
    backgroundColor: 'blue',
    opacity: 0.8
  },
  position: {
    position: 'absolute',
    width: 20,
    height: 20,
    margin: -10,
    borderRadius:10,
    backgroundColor: 'yellow',
    opacity: 0.7,
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
    x:0,
    y:0,
    left:0,
    top:styles.pad.width
  }

  changePosition(pos) {
    this.setState({left:pos.nativeEvent.offsetX, top:pos.nativeEvent.offsetY})
    this.setState({x:pos.nativeEvent.offsetX/styles.pad.width, y:1 - pos.nativeEvent.offsetY/styles.pad.width})
    // console.log(`x:${this.state.x}`
    //   + ` y:${this.state.y}`);
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
