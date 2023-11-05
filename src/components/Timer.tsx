import React, { useEffect, useState, type FC } from 'react'

interface TimerProps {
  started: boolean
  startFn: () => void
  paused: boolean
  pauseFn: () => void
  setTimeReached: React.Dispatch<React.SetStateAction<boolean>>
  stopFn: () => void
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
}

let minutes: number | undefined
let seconds: number | undefined
const Timer: FC<TimerProps> = (props) => {
  const [timerText, setTimerText] = useState<string>('')
  const [timerInterval, setTimerInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null)
  minutes ??= props.ascending ? 0 : props.inputMinutes
  seconds ??= props.ascending ? 0 : props.inputSeconds

  function pauseTimer (): void {
    props.pauseFn()
    clearTimerInterval()
  }

  function resumeTimer (): void {
    timerFn()
    setTimerInterval(
      setInterval(() => {
        timerFn()
      }, 1000)
    )
    props.startFn()
  }

  function timerFn (): void {
    props.ascending ? incrementTimer() : decrementTimer()
  }

  function stopTimer (): void {
    minutes = undefined
    seconds = undefined
    clearTimerInterval()
    props.stopFn()
  }

  function incrementTimer (): void {
    ++seconds!
    if (seconds === 60) {
      ++minutes!
      seconds = 0
    }
    setTimerText('' + minutes + ':' + (seconds! < 10 ? '0' + seconds : seconds))
  }

  function decrementTimer (): void {
    if (seconds! <= 0) {
      --minutes!
      seconds = 60
    }
    --seconds!
    setTimerText('' + minutes + ':' + (seconds! < 10 ? '0' + seconds : seconds))
  }

  function clearTimerInterval (): void {
    if (timerInterval !== null) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }

  useEffect(() => {
    if (props.started && !props.paused) {
      // Clear to be safe
      clearTimerInterval()
      resumeTimer()
    }
  }, [props.started])

  return (
    <div>
      <div className="timer">{timerText}</div>
      <img
        className="pause button"
        src="img/play-pause.svg"
        style={{ display: props.started ? 'flex' : 'none' }}
        onClick={props.paused ? resumeTimer : pauseTimer}
      ></img>
      <div
        className="stop button"
        style={{ display: props.started ? 'flex' : 'none' }}
        onClick={stopTimer}
      ></div>
    </div>
  )
}

export default Timer
