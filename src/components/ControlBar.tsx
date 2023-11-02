import React, { type FC, type PropsWithChildren } from 'react'
import '../css/control-bar.css'
import '../img/play-pause.svg'

const ControlBar: FC = (prop: PropsWithChildren) => {
  return (
    <div className="control-bar">
      <div className="timer-start button">Start</div>
      <img className="pause button" src="static/media/play-pause.svg"></img>
      <div className="stop button"></div>
    </div>
  )
}

export default ControlBar
