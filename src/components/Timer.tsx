import React, { useEffect, useState, type FC } from 'react'

interface TimerProps {
  started: boolean
  minutesInput: number
  secondsInput: number
  ascending: boolean
}

const Timer: FC<TimerProps> = (props) => {
  const [timerText, setTimerText] = useState<string>('')
  const [minutes, setMinutes] = useState<number>(10)
  const [seconds, setSeconds] = useState<number>(0)
  const [internalTimer, setInternalTimer] = useState<number>(0)
  let targetTime = 0

  let timerInterval: ReturnType<typeof setInterval> | null
  function startTimer (): void {
    // reset()
    timerFn()
    targetTime = props.minutesInput * 60 + props.secondsInput
    timerInterval = setInterval(() => { timerFn() }, 1000)
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
    setSeconds(seconds + 1)
    if (seconds === 60) {
      setMinutes(minutes + 1)
      setSeconds(0)
    }
    setTimerText('' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds))
    setInternalTimer(internalTimer + 1)
  }

  function decrementTimer (): void {
    if (seconds <= 0) {
      setMinutes(minutes - 1)
      setSeconds(60)
    }
    setSeconds(seconds - 1)
    setTimerText('' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds))
    setInternalTimer(internalTimer + 1)
  }

  useEffect(() => {
    if (props.started) {
      startTimer()
    } else {
      stopTimer()
    }
  }, [props.started])

  return <div
        className="timer"
    >
        {timerText}
    </div>
}

export default Timer
