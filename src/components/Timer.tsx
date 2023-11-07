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

const tone = new Audio('assets/audio/tone.mp3')
let minutes: number | undefined
let seconds: number | undefined
let timerInterval: ReturnType<typeof setInterval> | null
const Timer: FC<TimerProps> = (props) => {
  const [timerText, setTimerText] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
  minutes ??= props.ascending ? 0 : props.inputMinutes
  seconds ??= props.ascending ? 0 : props.inputSeconds
  const targetTime = props.inputMinutes * 60 + props.inputSeconds

  function pauseTimer (): void {
    props.pauseFn()
    clearTimerInterval()
  }

  function resumeTimer (): void {
    timerFn()
    timerInterval = setInterval(timerFn, 1000)
    if (initialized) {
      props.startFn()
    }
  }

  function timerFn (): void {
    props.ascending ? incrementTimer() : decrementTimer()
    checkTimer()
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
      timerInterval = null
    }
  }

  function checkTimer (): void {
    if (minutes! * 60 + seconds! > targetTime) {
      props.setTimeReached(true)
      void tone.play()
      setTimeout(() => {
        alert('You have reached your target!')
      }, 50)
      stopTimer()
    }
  }

  useEffect(() => {
    // we +-1 here because of initial render and pause logic calling increment or decrement twice
    seconds! += props.ascending ? -1 : 1
    if (props.started && !props.paused) {
      // Clear to be safe
      clearTimerInterval()
      // we +-1 here because of initial render and pause logic calling increment or decrement twice
      seconds! += props.ascending ? -1 : 1
      resumeTimer()
    }
    timerFn()
    setInitialized(true)
  }, [props.started])

  return (
    <div>
      <div className="timer">{timerText}</div>
      <img
        className="pause button"
        src={require('../img/play-pause.svg')}
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
