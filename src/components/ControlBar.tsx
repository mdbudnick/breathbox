import React, { type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'

interface ControlBarProps {
  started: boolean
  startFn: () => void
}

const ControlBar: FC<ControlBarProps> = (props) => {
  return (
    <div className={props.started ? 'control-bar top-buffer' : 'control-bar'}>
      <div className="timer-start button" onClick={props.startFn}>Start</div>
      <img className="pause button" src="static/media/play-pause.svg"></img>
      <div className="stop button"></div>
    </div>
  )
}

export default ControlBar
