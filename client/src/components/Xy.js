import  React, { Component } from 'react';

const styles = {
  pad: {
    position: 'relative',
    width: 300,
    height: 300,
    margin: 30,
    borderRadius: 5,
    backgroundColor: '#21A0A0',
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
    left:styles.pad.width * 0.5,
    top:styles.pad.width * 0.5
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      left:styles.pad.width * nextProps.x,
      top: styles.pad.width * (1 - nextProps.y)
    })
  }

  changePosition(pos) {
    this.setState({left:pos.nativeEvent.offsetX, top:pos.nativeEvent.offsetY})
    const x = pos.nativeEvent.offsetX/styles.pad.width
    const y = 1 - pos.nativeEvent.offsetY/styles.pad.width
    this.props.changeSound(x, y)
  }

  updatePosition(pos) {
    if (pos.nativeEvent.layerX < styles.pad.width &&
      0 < pos.nativeEvent.layerX &&
      0 < pos.nativeEvent.layerY &&
      pos.nativeEvent.layerY < styles.pad.width) {
        this.setState({left:pos.nativeEvent.layerX, top:pos.nativeEvent.layerY})
        const x = pos.nativeEvent.layerX/styles.pad.width
        const y = 1 - pos.nativeEvent.layerY/styles.pad.width
        this.props.changeSound(x, y)
       }
  }

  modifySound = (e) => {
    const type = e.type
    switch (type) {
      case 'touchstart':
        this.updatePosition(e)
        this.setState({touched: true})
        break
      case 'mousedown':
        this.changePosition(e)
        this.setState({touched: true})
        break
      case 'mousemove':
        if (this.state.touched) {
          this.changePosition(e)
        }
        break
      case 'touchmove':
        if (this.state.touched) {
          e.preventDefault()
          this.updatePosition(e)
        }
        break
      default:
      // console.log(e.type);
        this.setState({touched: false})
    }
  }

  render () {
    return (
      <div style={styles.pad}
        onTouchMove={this.modifySound}
        onTouchStart={this.modifySound}
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
