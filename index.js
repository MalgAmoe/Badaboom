var audioContext = new AudioContext()

//------------------------global variables
var tempo = 90
var eventsScheduled = []

//------------------------sequencer class
function Sequencer(resolution, division) {
  var seq = {}
  seq.resolution = resolution
  seq.division = division
  seq.steps = []
  seq.currentStep = -1
  for (var i = 0; i < division; i++) {
    seq.steps[i] = 0
  }

  seq.setStep = function(stepNum, velocity) {
    seq.steps[stepNum] = velocity
  }

  seq.eraseStep = function(stepNum) {
    seq.setStep(stepNum, 0)
  }

  seq.checkNextStep = function() {
    var nextStep = ++seq.currentStep
    if (nextStep >= seq.division) {
      nextStep = seq.currentStep = 0
    }
    var velocity = seq.steps[nextStep]
    var nextStepData = [nextStep, velocity]
    console.log(nextStepData);
    return nextStepData
  }

  return seq
}

//-------------------------sequencer instance
var kickSequencer = Sequencer(1, 16)
kickSequencer.setStep(0, 1)
kickSequencer.setStep(3, 0.5)
kickSequencer.setStep(4, 1)
kickSequencer.setStep(6, 0.8)
kickSequencer.setStep(8, 0.5)
kickSequencer.setStep(10, 1)
kickSequencer.setStep(12, 1)

console.log('seq', kickSequencer.steps);

//-------------------------event scheduling
var intervalCheck = setInterval(kickSequencer.checkNextStep, 500)

var interval = setInterval(playKicks, 4000)

function playKicks() {
  playKick(0, 0.05, 1)
  playKick(1, 0.05, 0.3)
  playKick(2, 0.05, 0.8)
  playKick(3, 0.05, 0.2)
}

//-------------------------sound generation
function playKick (delay, duration, velocity) {
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
  amp.gain.setTargetAtTime(velocity, startTime, 0.0001)
  amp.gain.setTargetAtTime(0, endTime, 0.2)

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}
