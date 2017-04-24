
class Sequencer {
  constructor(resolution, division, tempo, triggerSound) {
    this.resolution = resolution
    this.division = division
    this.steps = []
    for (let i = 0; i < 16; i++) {
      this.steps[i] = 0
    }
    this.currentStep = -1
    this.nextStepTime = 0
    this.timeLag = (60.0 / tempo) * resolution / division
    this.triggerSound = triggerSound
  }

  setStep = (stepNum, velocity) => {
    this.steps[stepNum] = velocity
  }

  eraseStep = (stepNum) => {
    this.setStep(stepNum, 0)
  }

  getNextStep = () => {
    let nextStep = ++this.currentStep

    if(nextStep >= this.division) {
      nextStep = this.currentStep = 0
    }
    let velocity = this.steps[nextStep]
    let time = this.nextStepTime
    let nextStepData = [time, velocity]
    this.nextStepTime += this.timeLag


    return nextStepData
  }

  scheduleSteps = function(scheduleWindow, audioContext) {
    while(this.nextStepTime < audioContext.currentTime + scheduleWindow) {
      var kickData = this.getNextStep()
      if (kickData[1] > 0) {
        this.triggerSound(kickData[0], kickData[1], audioContext)
      }
    }
  }

  changeTempo = (tempo) => {
    this.timeLag = (60.0 / tempo) * this.resolution / this.division
  }

  stop = () => {
    console.log(this.nextStepTime);
    this.currentStep = -1
  }

  start = (audioContext) => {
    console.log(this.nextStepTime);
    this.nextStepTime = audioContext.currentTime
  }
}

export default Sequencer
