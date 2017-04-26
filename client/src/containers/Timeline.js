import  React, { Component } from 'react';
import Step from '../components/Step'
import './style.css'

const styles = {
  timeline: {
    flex: 1,
    height: 75,
    borderRadius: 20,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5
  }
}

class Timeline extends Component {
  render() {
    return (
      <div style={styles.timeline} className={'timelineSize'}>
        {
          this.props.steps.map((step, i) => (
            <Step key={i} stepNum={i} velocity={step} addStep={this.props.addStep}/>
          ))
        }
      </div>
    )
  }
}

export default Timeline
