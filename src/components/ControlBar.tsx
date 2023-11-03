import React, { type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'

interface ControlBarProps {
  started: boolean
  startFn: () => void
  stopFn: () => void
}

export function resetStartButton(): undefined {
  common.start.style.color = 'white'
  common.start.style.border = '4px solid green'
  common.start.style.backgroundColor = 'lightgreen'
  common.start.style.borderRadius = '5vw'
  common.start.textContent = 'Start'
  common.start.classList.add('button')
}

const ControlBar: FC<ControlBarProps> = (props) => {
  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      <div className="timer-start button" onClick={props.startFn}>Start</div>
      <img className="pause button" src="static/media/play-pause.svg" style={{ display: props.started ? 'none' : 'flex' }}></img>
      <div className="stop button" style={{ display: props.started ? 'none' : 'flex' }} onClick={props.stopFn}></div>
    </div>
  )
}

export default ControlBar
