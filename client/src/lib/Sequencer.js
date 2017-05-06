
class Sequencer {
  constructor(resolution, division, tempo, sound) {
    this.tempo = tempo
    this.resolution = resolution
    this.division = division
    this.steps = []
    for (let i = 0; i < 16; i++) {
      this.steps[i] = 0
    }
    this.currentStep = 0
    this.nextStepTime = 0
    this.sound = sound
    this.timeLag = 0
    this.calculateLag()
    this.delaySequence = 0
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

  getLoopLength() {
    return this.timeLag * this.division
  }

  setDelaySequence(delay) {
    this.delaySequence = delay
  }

  scheduleSteps = function(scheduleWindow, audioContext) {
    while(this.nextStepTime < audioContext.currentTime + scheduleWindow) {
      var soundData = this.getNextStep()
      if (soundData[1] > 0) {
        this.sound.play(soundData[0], soundData[1], this.timeLag, audioContext)
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
    this.currentStep = 0
  }

  start = (audioContext) => {
    this.nextStepTime = audioContext.currentTime
  }

  startWithDelay = (audioContext, delay) => {
    this.currentStep = delay.step
    this.nextStepTime = audioContext.currentTime + delay.delay
  }
}

export default Sequencer
