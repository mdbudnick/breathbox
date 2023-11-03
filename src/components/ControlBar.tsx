import React, { useState, type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'
import Timer from './Timer'
import { type ActionStyle } from '../ts/shared'

interface ControlBarProps {
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  startFn: () => void
  stopFn: () => void
  actionStyle: ActionStyle
  setActionStyle: React.Dispatch<React.SetStateAction<ActionStyle>>
  setActionText: React.Dispatch<React.SetStateAction<string>>
  resetCircleStyle: () => void
}

interface StartButtonStyle {
  color: string
  border: string
  backgroundColor: string
  borderRadius: string
}
const ControlBar: FC<ControlBarProps> = (props) => {
  const [paused, setPaused] = useState<boolean>(false)

  function stopBreathBox (): void {
    setPaused(false)
    props.stopFn()
  }

  function pauseBreathBox (): void {
    setPaused(false)
    props.setStarted(false)
    props.setActionText('Paused')
    props.setActionStyle({ ...props.actionStyle, color: '#ff8c00' })
    props.resetCircleStyle()
  }

  function resumeBreathBox (): void {
    setPaused(true)
    props.startFn()
  }

  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      (started && !paused) || (paused && !started) ?
      <Timer started={ props.started }/>
      :
      <div
        className="start button"
        onClick={props.startFn}
      >
        Start
      </div>
      <img
        className="pause button"
        src="static/media/play-pause.svg"
        style={{ display: props.started ? 'none' : 'flex' }}
        onClick={paused ? resumeBreathBox : pauseBreathBox}
      ></img>
      <div
        className="stop button"
        style={{ display: props.started ? 'none' : 'flex' }}
        onClick={stopBreathBox}
      ></div>
    </div>
  )
}

export default ControlBar
