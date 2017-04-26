class Hat {
  constructor() {
    this.bufferLength = 2561
    this.filterFrequency = 5000
    this.decay = 0.125
    this.x = 0.5
    this.y = 0.5
  }
  play(triggerTime, velocity, stepLength, audioContext) {
    const duration = stepLength * this.decay
    const startTime = triggerTime
    const endTime = triggerTime + duration

    const noiseBuffer = audioContext.createBuffer(1, this.bufferLength, audioContext.sampleRate)
    const noiseOutput = noiseBuffer.getChannelData(0)
    for (let i = 0; i < this.bufferLength; i++) {
      noiseOutput[i] = 2 * Math.random() - 1
    }

    const whiteNoise = audioContext.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const amp = audioContext.createGain()
    amp.connect(audioContext.destination)

    const filter = audioContext.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = this.filterFrequency

    whiteNoise.connect(filter)
    filter.connect(amp)

    amp.gain.value = 0
    amp.gain.setTargetAtTime(velocity * 0.8, startTime, 0.00001)
    amp.gain.setTargetAtTime(0, endTime, duration)

    whiteNoise.start(startTime)
    whiteNoise.stop(endTime + duration * 10)
  }

  changeSound(x, y) {
    this.x = x
    this.y = y
    this.decay = (0.25 + Math.pow(x, 2)) * 0.25
    this.bufferLength = 1 + (1 - y) * 5120
    this.filterFrequency = (y + x) * 5000
  }
}

export default Hat
