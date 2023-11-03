import React, { useState, type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'

interface ControlBarProps {
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  startFn: () => void
  stopFn: () => void
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
  const [startButtonStyle, setStartButtonStyle] = useState<StartButtonStyle>(START_BUTTON_RESET_STYLE)
  const [startAndTimerText, setStartAndTimerText] = useState<string>('Start')
  const [paused, setPaused] = useState<boolean>(false)

  function resetStartButton(): void {
    setStartButtonStyle(START_BUTTON_RESET_STYLE)
    setStartAndTimerText('Start')
  }

  function stopBreathBox(): void {
    props.stopFn()
    resetStartButton()
  }

  function pauseBreathBox (): void {
    setPaused(false)
    //   started = false

    //   resetAnimations()
    //   resetActionText('Paused')
    //   common.action.style.color = '#ff8c00' // dark orange
    //   resetCircleStyle()

    //   common.pauseButton.style.color = 'green'
    //   common.pauseButton.textContent = '▶'

    //   common.pauseButton.onclick = resumeBreathBox
  }

  function resumeBreathBox (): void {
    setPaused(true)
    props.startFn()
  }

  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      <div className="timer-start button" style={startButtonStyle} onClick={props.startFn}>{startAndTimerText}</div>
      <img className="pause button" src="static/media/play-pause.svg" style={{ display: props.started ? 'none' : 'flex' }} onClick={paused ? resumeBreathBox : pauseBreathBox}></img>
      <div className="stop button" style={{ display: props.started ? 'none' : 'flex' }} onClick={stopBreathBox}></div>
    </div>
  )
}

export default ControlBar
