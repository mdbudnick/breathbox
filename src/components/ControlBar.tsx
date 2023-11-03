import React, { useState, type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'
import { type ActionStyle } from '../ts/shared'

interface ControlBarProps {
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  startFn: () => void
  stopFn: () => void
  actionStyle: ActionStyle
  setActionStyle: React.Dispatch<React.SetStateAction<ActionStyle>>
  setActionText: React.Dispatch<React.SetStateAction<string>>
}

interface StartButtonStyle {
  color: string
  border: string
  backgroundColor: string
  borderRadius: string
}

const START_BUTTON_RESET_STYLE: StartButtonStyle = {
  color: 'white',
  border: '4px solid green',
  backgroundColor: 'lightgreen',
  borderRadius: '5vw'
}

const ControlBar: FC<ControlBarProps> = (props) => {
  const [startButtonStyle, setStartButtonStyle] = useState<StartButtonStyle>(
    START_BUTTON_RESET_STYLE
  )
  const [startAndTimerText, setStartAndTimerText] = useState<string>('Start')
  const [paused, setPaused] = useState<boolean>(false)

  function resetStartButton (): void {
    setStartButtonStyle(START_BUTTON_RESET_STYLE)
    setStartAndTimerText('Start')
  }

  function stopBreathBox (): void {
    props.stopFn()
    resetStartButton()
  }

  function pauseBreathBox (): void {
    setPaused(false)
    props.setStarted(false)
    props.setActionText('Paused')
    props.setActionStyle({ ...props.actionStyle, color: '#ff8c00' })

    //   resetCircleStyle()
  }

  function resumeBreathBox (): void {
    setPaused(true)
    props.startFn()
  }

  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      <div
        className="timer-start button"
        style={startButtonStyle}
        onClick={props.startFn}
      >
        {startAndTimerText}
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
