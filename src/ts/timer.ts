import {
  pauseButton,
  start,
  stopButton,
  timerMinutesInput,
  timerSecondsInput
} from './common'

class TimerClass {
  private minutes: number
  private seconds: number
  private timerInterval: ReturnType<typeof setInterval> | null
  private targetTime: number
  private internalTimer: number
  private ascending: boolean

  constructor () {
    this.minutes = 0
    this.seconds = 0
    this.internalTimer = 0
    this.targetTime = 600
    this.timerInterval = null
    this.ascending = true
  }

  getMinuteInput (): number {
    return timerMinutesInput.value === ''
      ? 0
      : parseInt(timerMinutesInput.value)
  }

  getSecondInput (): number {
    return timerSecondsInput.value === ''
      ? 0
      : parseInt(timerSecondsInput.value)
  }

  startTimer (): undefined {
    this.reset()
    this.timerFn()
    this.targetTime = this.getMinuteInput() * 60 + this.getSecondInput()
    start.style.backgroundColor = 'transparent'
    start.style.border = 'none'
    start.classList.remove('button')
    this.timerInterval = setInterval(this.timerFn.bind(this), 1000)
  }

  timerFn (): undefined {
    this.ascending ? this.incrementTimer() : this.decrementTimer()
  }

  incrementTimer (): undefined {
    ++this.seconds
    if (this.seconds === 60) {
      ++this.minutes
      this.seconds = 0
    }
    start.textContent =
      '' +
      this.minutes +
      ':' +
      (this.seconds < 10 ? '0' + this.seconds : this.seconds)

    ++this.internalTimer
  }

  decrementTimer (): undefined {
    if (this.seconds <= 0) {
      --this.minutes
      this.seconds = 60
    }
    --this.seconds
    start.textContent =
      '' +
      this.minutes +
      ':' +
      (this.seconds < 10 ? '0' + this.seconds : this.seconds)

    ++this.internalTimer
  }

  updateMinutesAndSeconds (seconds: number): undefined {
    this.minutes = Math.floor(seconds / 60)
    this.seconds = seconds % 60
  }

  addPauseButton (): undefined {
    pauseButton.style.display = 'flex'
  }

  addStopButton (): undefined {
    stopButton.style.display = 'flex'
  }

  reset (): undefined {
    this.minutes = this.ascending ? 0 : this.getMinuteInput()
    this.seconds = this.ascending ? 0 : this.getSecondInput()

    this.internalTimer = 0

    clearInterval(this.timerInterval!)
  }

  reachedTime (): boolean {
    return this.internalTimer >= this.targetTime
  }

  switchDirection (): undefined {
    this.ascending = !this.ascending
  }

  clearInterval (): undefined {
    clearInterval(this.timerInterval!)
    this.timerInterval = null
  }
}

export const Timer = new TimerClass()
