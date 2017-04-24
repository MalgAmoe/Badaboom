
export default class Scheduler {
  constructor(tempo, sequencer, audioContext) {
    this.audioContext = audioContext
    this.tempo = tempo
    this.scheduleInterval = 20
    this.scheduleWindow = 0.03
    this.sequencer = sequencer
    this.timerID = null
  }

  start = () => {
    this.timerID = setInterval(this.schedule, this.scheduleInterval)
  }

  stop = () => {
    clearInterval(this.timerID)
  }

  schedule = () => {
    this.sequencer.scheduleSteps(this.scheduleWindow, this.audioContext)
  }
}
