import React, { type FC } from 'react'

const ControlBar: FC = (prop: PropTypes) => {
  return (
    <div className="control-bar">
      <div className="timer-start button">Start</div>
      <img className="pause button" src="assets/img/play-pause.svg"></img>
      <div className="stop button"></div>
    </div>
  )
}

export default ControlBar
