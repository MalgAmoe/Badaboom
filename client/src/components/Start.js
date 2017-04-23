import React from 'react'

const Styles = {
  start: {
    height: 75,
    width: 75,
    borderRadius: 20,
    marginRight: 50,
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  }
}

const Start = (props) => {
  return (
    <div style={Styles.start}>{props.action}</div>
  )
}

export default Start
