import React from 'react'

const styles = {
  slider: {
    margin: 25
  }
}

const Slider = (props) => {
  return (
    <input style={styles.slider} type='range' min='1' max={props.max}/>
  )
}

export default Slider
