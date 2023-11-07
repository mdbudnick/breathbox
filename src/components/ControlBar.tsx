import React, { type FC } from 'react'
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

const ControlBar: FC<ControlBarProps> = (props) => {
  function startBreathBox (): void {
    props.startFn()
    props.setTimeReached(false)
  }

  function pauseBreathBox (): void {
    props.pauseFn()
  }

  function stopBreathBox (): void {
    props.setTimeReached(false)
    props.stopFn()
  }

  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      {props.started
        ? (
        <Timer
          started={props.started}
          startFn={startBreathBox}
          paused={props.paused}
          pauseFn={pauseBreathBox}
          setTimeReached={props.setTimeReached}
          stopFn={stopBreathBox}
          inputMinutes={props.configInput.inputMinutes}
          inputSeconds={props.configInput.inputSeconds}
          ascending={props.configInput.ascending}
        />
          )
        : (
        <div className="start button" onClick={startBreathBox}>
          Start
        </div>
          )}
    </div>
  )
}

export default ControlBar
