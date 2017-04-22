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
  seq.nextNoteTime = 0
  seq.timeLag = 0
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
    //get values for next step
    var nextStep = ++seq.currentStep
    if (nextStep >= seq.division) {
      nextStep = seq.currentStep = 0
    }
    var velocity = seq.steps[nextStep]
    var nextStepData = [seq.nextNoteTime, velocity]

    //next step time calculated
    seq.nextNoteTime += seq.timeLag

    return nextStepData
  }

  seq.startSequencer = function() {
    seq.timeLag = (60.0 / tempo) * seq.resolution / seq.division
    var kickData = seq.checkNextStep()
    setTimeout(function(){playKick(kickData[0], 0.05, kickData[1])}, seq.timeLag * 0.5)
    setInterval(seq.scheduleStep, seq.timeLag)
  }

  seq.scheduleStep = function() {
    // for (var i = 0; i < 8; i++) {
    // }
    var kickData = seq.checkNextStep()
    if (kickData[0] > 0) {
      playKick(kickData[0], 0.05, kickData[1])
    }
  }

  return seq
}

//-------------------------sequencer instance
var kickSequencer = Sequencer(4, 16)
kickSequencer.setStep(0, 1)
kickSequencer.setStep(3, 0.5)
kickSequencer.setStep(4, 0.5)
kickSequencer.setStep(6, 0.8)
kickSequencer.setStep(8, 0.5)
kickSequencer.setStep(10, 1)
kickSequencer.setStep(12, 0.5)
kickSequencer.startSequencer()

//-------------------------event scheduling
// var intervalCheck = setInterval(kickSequencer.checkNextStep, 500)

// var interval = setInterval(playKicks, 4000)
//
// function playKicks() {
//   playKick(0, 0.05, 1)
//   playKick(1, 0.05, 0.3)
//   playKick(2, 0.05, 0.8)
//   playKick(3, 0.05, 0.2)
// }

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
