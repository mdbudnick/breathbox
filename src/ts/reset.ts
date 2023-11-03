import { SharedIntervals } from './sharedIntervals'
import { Timer } from './timer'

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
