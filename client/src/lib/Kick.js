class Kick {
  constructor() {
    this.name = 'Kick'
    this.frequency = 50
    this.attackFrequency = 200
    this.attackTime = 0.03
    this.decay = 0.5
    this.x = 0.5
    this.y = 0.5
  }

  play(triggerTime, velocity, stepLength, audioContext) {
    const duration = stepLength * this.decay
    const startTime = triggerTime
    const endTime = triggerTime + duration

    const oscillator = audioContext.createOscillator()
    oscillator.frequency.value = this.attackFrequency
    oscillator.frequency.setValueAtTime(this.attackFrequency, startTime)
    oscillator.frequency.exponentialRampToValueAtTime(this.frequency, startTime + this.attackTime)

    const amp = audioContext.createGain()
    amp.connect(audioContext.destination)
    oscillator.connect(amp)
    amp.gain.value = 0
    amp.gain.setTargetAtTime(velocity, startTime, 0.00001)
    amp.gain.setTargetAtTime(0, endTime, duration)

    oscillator.start(startTime)
    oscillator.stop(endTime + duration * 10)
  }

  changeSound(x, y) {
    this.x = x
    this.y = y
    this.frequency = 30 + 40 * y
    this.decay = 0.25 + Math.pow(x, 2)
    this.attackFrequency = 300 - 300 * x + 200 * y
  }
}

export default Kick
