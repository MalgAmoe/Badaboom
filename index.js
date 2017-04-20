var audioContext = new AudioContext()

playKick(0, 0.5)
playKick(1, 0.5)
playKick(2, 0.5)

function playKick (delay, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration

  var oscillator = audioContext.createOscillator()

  oscillator.type = 'sine'
  oscillator.frequency.value = 200
  oscillator.frequency.setValueAtTime(200, startTime)
  oscillator.frequency.exponentialRampToValueAtTime(50, startTime + 0.03)

  var amp = audioContext.createGain()
  amp.connect(audioContext.destination)
  oscillator.connect(amp)
  amp.gain.value = 0
  amp.gain.setTargetAtTime(1, startTime, 0.0001)
  amp.gain.setTargetAtTime(0, startTime + 0.05, 0.2)

  oscillator.start(startTime)
  oscillator.stop(endTime + 1)
}
