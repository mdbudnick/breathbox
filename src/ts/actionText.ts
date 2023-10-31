// We have to do this each time because the window can be resized
import { action } from './common'

export function startCountdownDecrement(
  text: string,
  time: number
): ReturnType<typeof setInterval> {
  let countdownInterval: ReturnType<typeof setInterval> | null
  countdownInterval = setInterval(() => {
    --time
    if (time !== 0) {
      action.textContent = text + '\r\n' + time
    } else {
      action.textContent = text
      // It cancels itself
      clearInterval(countdownInterval!)
      countdownInterval = null
    }
  }, 1000)
  // Do it the first time
  action.textContent = text + '\r\n' + time

  return countdownInterval
}
