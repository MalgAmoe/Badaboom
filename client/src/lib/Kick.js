export default function playKick (triggerTime, velocity, stepLength, audioContext) {
  const duration = stepLength * 0.5
  const startTime = triggerTime
  const endTime = triggerTime + duration

  const oscillator = audioContext.createOscillator()

  oscillator.type = 'sine'
  oscillator.frequency.value = 200
  oscillator.frequency.setValueAtTime(200, startTime)
  oscillator.frequency.exponentialRampToValueAtTime(50, startTime + 0.03)

  const amp = audioContext.createGain()
  amp.connect(audioContext.destination)
  oscillator.connect(amp)
  amp.gain.value = 0
  amp.gain.setTargetAtTime(velocity, startTime, 0.00001)
  amp.gain.setTargetAtTime(0, endTime, duration)

  oscillator.start(startTime)
  oscillator.stop(endTime + duration * 10)
}
