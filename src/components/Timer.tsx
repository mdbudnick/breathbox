import React, { useState, type FC } from 'react'

interface TimerProps {
  started: boolean
  paused: boolean
  setTimeReached: React.Dispatch<React.SetStateAction<boolean>>
  stopFn: () => void
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
}

const Timer: FC<TimerProps> = (props) => {
  const [timerText, setTimerText] = useState<string>('')
  let minutes = props.inputMinutes
  let seconds = props.inputSeconds
  reset()
  const [timerStarted, setTimerStarted] = useState<boolean>(false)

  let timerInterval: ReturnType<typeof setInterval> | null
  function startTimer (): void {
    reset()
    timerFn()
    timerInterval = setInterval(() => {
      timerFn()
    }, 1000)
  }

  function stopTimer (): void {
    if (timerInterval !== null) {
      clearInterval(timerInterval)
    }
  }

  function timerFn (): void {
    props.ascending ? incrementTimer() : decrementTimer()
  }

  function incrementTimer (): void {
    ++seconds
    if (seconds === 60) {
      ++minutes
      seconds = 0
    }
    setTimerText('' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds))
  }

  function decrementTimer (): void {
    if (seconds <= 0) {
      --minutes
      seconds = 60
    }
    --seconds
    setTimerText('' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds))
  }

  function reset (): void {
    minutes = props.ascending ? 0 : props.inputMinutes
    seconds = props.ascending ? 0 : props.inputSeconds
  }

  if (props.started && !props.paused && !timerStarted) {
    setTimerStarted(true)
    startTimer()
  } else if (props.started && props.paused && timerStarted) {
    setTimerStarted(false)
    stopTimer()
  }

  if (!props.started && timerStarted) {
    setTimerStarted(false)
    stopTimer()
    reset()
  }

  return <div className="timer">{timerText}</div>
}

export default Timer
