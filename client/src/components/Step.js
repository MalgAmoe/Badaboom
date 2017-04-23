import React from 'react'

const styles = {
  step: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 2
  }
}

const Step = (props) => {
  return (
    <div style={Object.assign({}, styles.step, {opacity: props.velocity * 0.9 + 0.1})}></div>
  )
}

export default Step
