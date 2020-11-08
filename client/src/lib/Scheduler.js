
export default class Scheduler {
  constructor(tempo, sequencers, audioContext) {
    this.audioContext = audioContext
    this.tempo = tempo
    this.scheduleInterval = 50
    this.scheduleWindow = 0.1
    this.sequencers = sequencers
    this.timerID = null
  }

  start = () => {
    this.timerID = setInterval(this.schedule, this.scheduleInterval)
  }

  stop = () => {
    clearInterval(this.timerID)
  }

  schedule = () => {
    this.sequencers.forEach(sequencer => {
      sequencer.scheduleSteps(this.scheduleWindow, this.audioContext)
    })
  }
}
