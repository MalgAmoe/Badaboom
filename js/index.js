

//------------------------global variables
var audioContext = new AudioContext()
var isPlaying = false
var startTime
var tempo = 120
var eventsScheduled = []
var timerWorker = null

var scheduleAheadTime = 0.04

var timerID = null
var interval = 10


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
    return seq.nextNoteTime
  }

  seq.getNextStep = function() {
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
    seq.timeLag = 0.5 * (60.0 / tempo) * seq.resolution / seq.division

    timerID = setInterval(scheduler, interval)
  }

  seq.changeTempo = function() {
    seq.timeLag = 0.5 * (60.0 / tempo) * seq.resolution / seq.division
  }

  seq.scheduleStep = function() {
    var kickData = seq.getNextStep()
    if (kickData[0] > 0) {
      playKick(kickData[0], 0.01, kickData[1])
    }
  }

  return seq
}

//-------------------------sequencer instance
var kickSequencer = Sequencer(2, 3)
kickSequencer.setStep(0, 1)
kickSequencer.setStep(1, 0.5)
kickSequencer.setStep(2, 0.5)
kickSequencer.setStep(3, 0.5)
kickSequencer.setStep(4, 1)
kickSequencer.setStep(5, 0.5)
kickSequencer.setStep(6, 0.5)
kickSequencer.setStep(7, 0.5)
kickSequencer.setStep(8, 1)
kickSequencer.setStep(9, 0.5)
kickSequencer.setStep(10, 0.5)
kickSequencer.setStep(11, 0.5)
kickSequencer.setStep(12, 1)
kickSequencer.setStep(13, 0.5)
kickSequencer.setStep(14, 0.5)
kickSequencer.setStep(15, 0.5)
kickSequencer.startSequencer()

//-------------------------event scheduling
function scheduler() {
  var nextNoteTime = kickSequencer.checkNextStep()

  while(nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    kickSequencer.scheduleStep()
    nextNoteTime = kickSequencer.checkNextStep()
  }
}

//-------------------------sequencer controls
// function play() {
//   isPlaying = !isPlaying
//
//   if (isPlaying) {
//     // kickSequencer.nextNoteTime = audioContext.currentTime
//     // kickSequencer.currentStep = 0
//     kickSequencer.startSequencer()
//
//     return 'stop'
//   } else {
//
//     return 'play'
//   }
// }

//-------------------------init data and functionalities



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
