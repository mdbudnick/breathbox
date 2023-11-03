import React, { type FC } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'

interface ControlBarProps {
  animateFn: () => void
}

const ControlBar: FC<ControlBarProps> = (props) => {
  return (
    <div className="control-bar">
      <div className="timer-start button" onClick={props.animateFn}>Start</div>
      <img className="pause button" src="static/media/play-pause.svg"></img>
      <div className="stop button"></div>
    </div>
  )
}

export default ControlBar
