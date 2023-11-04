import React, { useState, type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'
import Timer from './Timer'
import { type ActionStyle, type ConfigInput } from '../ts/shared'

interface ControlBarProps {
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  paused: boolean
  timeReached: boolean
  setTimeReached: React.Dispatch<React.SetStateAction<boolean>>
  startFn: () => void
  stopFn: () => void
  pauseFn: () => void
  actionStyle: ActionStyle
  setActionStyle: React.Dispatch<React.SetStateAction<ActionStyle>>
  setActionText: React.Dispatch<React.SetStateAction<string>>
  resetCircleStyle: () => void
  configInput: ConfigInput
}

const tone = new Audio('assets/audio/tone.mp3')

const ControlBar: FC<ControlBarProps> = (props) => {
  const [internalTimer, setInternalTimer] = useState<number>(0)
  const { inputMinutes, inputSeconds } = props.configInput
  let targetTime = 0
  function checkTimer (): void {
    setInternalTimer(internalTimer + 1)
    if (props.started && internalTimer >= targetTime) {
      props.setTimeReached(true)
      void tone.play()
      setTimeout(() => {
        alert('You have reached your target!')
      }, 50)
      stopBreathBox()
    }
  }

  let checkTimerInterval: ReturnType<typeof setInterval> | null
  function startBreathBox (): void {
    props.startFn()
    props.setTimeReached(false)
    targetTime = inputMinutes * 60 + inputSeconds
    checkTimerInterval = setInterval(checkTimer, 1000)
  }

  function stopBreathBox (): void {
    if (checkTimerInterval !== null) {
      clearInterval(checkTimerInterval)
    }
    setInternalTimer(0)
    props.setTimeReached(false)
    props.stopFn()
  }

  function pauseBreathBox (): void {
    props.pauseFn()
  }

  function resumeBreathBox (): void {
    startBreathBox()
  }

  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      { props.started
        ? <div>
        <Timer
        started={props.started}
        paused={props.paused}
        setTimeReached={props.setTimeReached}
        stopFn={stopBreathBox}
        inputMinutes={props.configInput.inputMinutes}
        inputSeconds={props.configInput.inputSeconds}
        ascending={props.configInput.ascending}
      />
      <img
        className="pause button"
        src="img/play-pause.svg"
        style={{ display: props.started ? 'flex' : 'none' }}
        onClick={props.paused ? resumeBreathBox : pauseBreathBox}
      ></img>
      <div
        className="stop button"
        style={{ display: props.started ? 'flex' : 'none' }}
        onClick={stopBreathBox}
      ></div></div>
        : <div className="start button" onClick={startBreathBox}>
          Start
        </div>}
    </div>
  )
}

export default ControlBar
