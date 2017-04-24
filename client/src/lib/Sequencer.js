
class Sequencer {
  constructor(resolution, division, tempo, triggerSound) {
    this.tempo = tempo
    this.resolution = resolution
    this.division = division
    this.steps = []
    for (let i = 0; i < 16; i++) {
      this.steps[i] = 0
    }
    this.currentStep = -1
    this.nextStepTime = 0
    // this.timeLag = (60.0 / tempo) * resolution / division
    this.triggerSound = triggerSound
    this.timeLag = 0
    this.calculateLag()
  }

  setStep = (stepNum, velocity) => {
    this.steps[stepNum] = velocity
  }

  eraseStep = (stepNum) => {
    this.setStep(stepNum, 0)
  }

  getNextStep = () => {
    let nextStep = this.currentStep++

    if(nextStep >= this.division) {
      this.currentStep = 0
      nextStep = this.currentStep++
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
        this.triggerSound(kickData[0], kickData[1], this.timeLag, audioContext)
      }
    }
  }

  calculateLag = () => {
    this.timeLag = (60.0 / this.tempo) * this.resolution / this.division
  }

  changeTempo = (tempo) => {
    this.tempo = tempo
    this.calculateLag()
  }

  changeResolution = (resolution) => {
    this.resolution = resolution
    this.calculateLag()
  }

  changeDivision = (division) => {
    this.division = division
    this.calculateLag()
  }

  stop = () => {
    this.currentStep = -1
  }

  start = (audioContext) => {
    this.nextStepTime = audioContext.currentTime
  }
}

export default Sequencer
