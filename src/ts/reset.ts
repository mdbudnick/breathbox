import * as shared from './shared'
import { SharedIntervals } from './sharedIntervals'
import { Timer } from './timer'

export interface CircleStyle {
  transitionProperty: circleTransitionProperty
  transitionDuration: circleTransitionDuration
  transitionTimingFunction: circleTransitionTimingFunction
  backgroundColor: circleColor
  height: circleHeight
  width: circleWidth
  bottom: circleBottom
  left: circleLeft
}

export function resetCircleStyle (): CircleStyle {
  return {
    transitionProperty: '',
    transitionDuration: '',
    transitionTimingFunction: shared.BREATH_CURVE,
    backgroundColor: shared.INHALE_COLOR,
    height: `${shared.SMALL_CIRCLE_SIZE}vh`,
    width: `${shared.SMALL_CIRCLE_SIZE}vh`,
    bottom: '-1vh',
    left: '-1vh',
  }
}

export function resetAnimations (): undefined {
  clearTimeout(SharedIntervals.inhaleAnimation!)
  SharedIntervals.inhaleAnimation = null
  clearInterval(SharedIntervals.inhaleCountdownInterval!)
  SharedIntervals.inhaleCountdownInterval = null
  clearTimeout(SharedIntervals.holdInAnimation!)
  SharedIntervals.holdInAnimation = null
  clearInterval(SharedIntervals.holdInCountdownInterval!)
  SharedIntervals.holdInCountdownInterval = null
  clearTimeout(SharedIntervals.exhaleAnimation!)
  SharedIntervals.exhaleAnimation = null
  clearInterval(SharedIntervals.exhaleCountdownInterval!)
  SharedIntervals.exhaleCountdownInterval = null
  clearTimeout(SharedIntervals.holdOutAnimation!)
  SharedIntervals.holdOutAnimation = null
  clearInterval(SharedIntervals.holdOutCountdownInterval!)
  SharedIntervals.holdOutCountdownInterval = null
  Timer.clearInterval()
}
