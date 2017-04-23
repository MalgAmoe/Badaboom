
class Sequencer {
  constructor(resolution, division, tempo) {
    this.resolution = resolution
    this.division = division
    this.steps = []
    for (let i = 0; i < 16; i++) {
      this.steps[i] = 0
    }
    this.currentStep = -1
    this.nextStepTime = 0
    this.timeLag = (60.0 / tempo) * resolution / division
  }

  this.setStep = (stepNum, velocity) => {
    this.steps[stepNum] = velocity
  }

  this.eraseStep = (stepNum) => {
    this.setStep(stepNum, 0)
  }

  this.checkNextStep = () => {
    return this.nextNoteTime
  }

  this.getNextStep = () => {
    let nextStep = ++this.currentStep

    if(nextStep >= this.division) {
      nextStep = seq.currentStep = 0
    }
    let velocity = this.steps[nextStep]
    let time = this.nextStepData
    let nextStepData = [time, velocity]

    this.nextNoteTime += this.timeLag

    return nextStepData
  }

  this.setTimeLag = (tempo) => {
    this.timeLag = (60.0 / tempo) * resolution / division
  }
}

export default Sequencer
