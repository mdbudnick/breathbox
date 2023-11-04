import React, { useEffect, useState, type FC } from 'react'

interface TimerProps {
  started: boolean
  paused: boolean
  setTimeReached: React.Dispatch<React.SetStateAction<boolean>>
  stopFn: () => void
  internalTimer: number
  setInternalTimer: React.Dispatch<React.SetStateAction<number>>
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
}

const Timer: FC<TimerProps> = (props) => {
  const [timerText, setTimerText] = useState<string>('')
  const [minutes, setMinutes] = useState<number>(10)
  const [seconds, setSeconds] = useState<number>(0)

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
    setSeconds(seconds + 1)
    if (seconds === 60) {
      setMinutes(minutes + 1)
      setSeconds(0)
    }
    setTimerText('' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds))
    props.setInternalTimer(props.internalTimer + 1)
  }

  function decrementTimer (): void {
    if (seconds <= 0) {
      setMinutes(minutes - 1)
      setSeconds(60)
    }
    setSeconds(seconds - 1)
    setTimerText('' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds))
    props.setInternalTimer(props.internalTimer + 1)
  }

  function reset (): void {
    setMinutes(props.ascending ? 0 : props.inputMinutes)
    setSeconds(props.ascending ? 0 : props.inputSeconds)

    props.setInternalTimer(0)
  }

  useEffect(() => {
    if (props.started && !props.paused) {
      startTimer()
    } else if (props.started && props.paused) {
      stopTimer()
    }

    if (!props.started) {
      stopTimer()
      reset()
    }
  }, [props.started, props.paused])

  return <div className="timer">{timerText}</div>
}

export default Timer
