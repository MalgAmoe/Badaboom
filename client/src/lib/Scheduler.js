
export default class Scheduler {
  constructor(tempo) {
    this.audioContext = new AudioContext()
    this.tempo = tempo
    this.interval = 100
    this.scheduleAheadTime = 0.15
    this.sequencers = []
  }

}
