import { vhToPx } from './vhFunc'
import { startCountdownDecrement } from './actionText'
import * as common from './shared'
import { SharedIntervals } from './sharedIntervals'
import { Timer } from './timer'
import {
  resetActionText,
  resetAnimations,
  resetCircleStyle,
  resetStartButton
} from './reset'

function validInputs (): boolean {
  let valid = true
  if (
    (common.timerMinutesInput.value === '' ||
      common.timerMinutesInput.value === '0') &&
    (common.timerSecondsInput.value === '' ||
      common.timerSecondsInput.value === '0')
  ) {
    common.timerMinutesInput.classList.add('red')
    common.timerSecondsInput.classList.add('red')
    valid = false
  } else {
    common.timerMinutesInput.classList.remove('red')
    common.timerSecondsInput.classList.remove('red')
  }

  if (
    common.breathTimeInput.value === '' ||
    common.breathTimeInput.value === '0'
  ) {
    common.breathTimeInput.classList.add('red')
    valid = false
  } else {
    common.breathTimeInput.classList.remove('red')
  }

  if (common.holdTimeInput.value === '' || common.holdTimeInput.value === '0') {
    common.holdTimeInput.classList.add('red')
    valid = false
  } else {
    common.holdTimeInput.classList.remove('red')
  }

  return valid
}

let started = false
let checkTimerInterval: ReturnType<typeof setInterval> | null
function startBreathBox (): undefined {
  if (!validInputs() || started) {
    return
  }
  common.config.classList.add('hidden')
  common.controlBar.classList.add('top-buffer')

  started = true
  Timer.startTimer()
  checkTimerInterval = setInterval(checkTimer, 1000)
  Timer.addPauseButton()
  Timer.addStopButton()
  resetActionText('')
  resetCircleStyle()
  animateBreathing()
}

const tone = new Audio('assets/audio/tone.mp3')
function checkTimer (): undefined {
  if (started && Timer.reachedTime()) {
    void tone.play()
    setTimeout(() => {
      alert('You have reached your target!')
    }, 50)
    stopBreathBox()
  }
}

function pauseBreathBox (): undefined {
  started = false

  resetAnimations()
  resetActionText('Paused')
  common.action.style.color = '#ff8c00' // dark orange
  resetCircleStyle()

  common.pauseButton.style.color = 'green'
  common.pauseButton.textContent = '▶'

  common.pauseButton.onclick = resumeBreathBox
}

function resumeBreathBox (): undefined {
  common.pauseButton.style.color = common.RESET_ORANGE
  common.pauseButton.textContent = '||'

  common.pauseButton.onclick = pauseBreathBox

  startBreathBox()
}

function flipArrow (): undefined {
  if (common.timerDirection.classList.contains('point-up')) {
    common.timerDirection.classList.replace('point-up', 'point-down')
  } else {
    common.timerDirection.classList.replace('point-down', 'point-up')
  }
  Timer.switchDirection()
}

common.timerDirection.onclick = flipArrow

common.start.onclick = startBreathBox
common.stopButton.onclick = stopBreathBox
common.pauseButton.onclick = pauseBreathBox
