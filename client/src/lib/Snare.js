class Snare {
  constructor() {
    this.sineFrequency = 150
    this.attack = 0.00001
    this.decay = 0.25
    this.blend = 0.5
    this.x = 0.5
    this.y = 0.5
  }

  play(triggerTime, velocity, stepLength, audioContext) {
    const duration = stepLength * this.decay
    const startTime = triggerTime
    const endTime = triggerTime + duration

    const oscillator = audioContext.createOscillator()
    oscillator.frequency.value = this.sineFrequency

    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate, audioContext.sampleRate)
    const noiseOutput = noiseBuffer.getChannelData(0)
    for (let i = 0; i < audioContext.sampleRate; i++) {
      noiseOutput[i] = 2 * Math.random() - 1
    }

    const whiteNoise = audioContext.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const amp = audioContext.createGain()
    amp.connect(audioContext.destination)

    const oscAmp = audioContext.createGain()
    oscAmp.connect(amp)
    oscAmp.gain.value = this.blend

    const noiseAmp = audioContext.createGain()
    noiseAmp.connect(amp)
    noiseAmp.gain.value = 1 - this.blend

    whiteNoise.connect(noiseAmp)
    oscillator.connect(oscAmp)
    amp.gain.value = 0
    amp.gain.setTargetAtTime(velocity, startTime, this.attack)
    amp.gain.setTargetAtTime(0, endTime, duration)

    whiteNoise.start(startTime)
    whiteNoise.stop(endTime + duration * 10)
    oscillator.start(startTime)
    oscillator.stop(endTime + duration * 10)
  }

  changeSound(x, y) {
    this.x = x
    this.y = y
    this.blend = x
    this.sineFrequency = 100 + 100 * y
    this.decay = 0.2 * (x + y)
  }
}

export default Snare
