import React, { Component } from 'react'

const styles = {
  button: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: 2,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 2,
    opacity: 0.8
  },
  selector: {
    height: 48,
    width: 190,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  functionality: {
    textAlign: 'center',
    color: 'grey',
  },
  container: {
    margin: 40
  }
}

class ParameterValue extends Component {
  // state = {
  //   selected: this.props.selected,
  //   value: this.props.value
  // }
  // //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     selected: nextProps.selected,
  //     value: nextProps.value
  //   })
  //   console.log(nextProps.selected);
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  changeValue = () => {
    this.props.change(this.props.value)
  }

  render() {
    return (
      <div
        onClick={this.changeValue}
        style={Object.assign({}, styles.button, {
          backgroundColor: this.props.selected === this.props.value ? 'white' : 'grey'
        })}>{this.props.value}</div>
    )
  }
}

class StepParameter extends Component {
  render() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    return (
      <div style={styles.container}>
        <span style={styles.functionality}>{this.props.functionality}</span>
        <div style={styles.selector}>
          {
            values.map((value, i) => {
              return <ParameterValue
                key={i}
                value={value}
                change={this.props.change}
                selected={this.props.selected}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default StepParameter
