export default function playKick (triggerTime, velocity, audioContext) {
  const duration = 0.01
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
  amp.gain.setTargetAtTime(velocity, startTime, 0.0001)
  amp.gain.setTargetAtTime(0, endTime, 0.2)

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}
