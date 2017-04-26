import React, { Component } from 'react'

const styles = {
  button: {
    width: 30,
    height: 30,
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
    height: 70,
    width: 275,
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
    margin: 20
  }
}

class ParameterValue extends Component {

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
