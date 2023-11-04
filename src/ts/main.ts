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
