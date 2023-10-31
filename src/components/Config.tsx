import React, { type FC } from 'react'

const Config: FC = (prop: PropTypes) => {
  return (
    <div className="config">
      <div className="breath-time">
        <label htmlFor="breath-time">Breathe (seconds)</label>
        <input type="number" id="breath-time" min="1" max="10" value="6" />
      </div>
      <div className="hold-time">
        <label htmlFor="hold">Hold (seconds)</label>
        <input type="number" id="hold-time" min="1" max="10" value="3" />
      </div>
      <div className="countdown-input">
        <input
          type="number"
          id="countdown-seconds"
          min="0"
          max="45"
          value="0"
          step="15"
        />
        <label htmlFor="countdown-minutes">Time (mm:ss)</label>
        <input
          type="number"
          id="countdown-minutes"
          min="0"
          max="60"
          value="10"
        />
      </div>
      <div className="count-up-or-down">
        <label htmlFor="countdown">Count Direction</label>
        <span id="time-arrow" className="point-up">
          &#10148;
        </span>
      </div>
    </div>
  )
}

export default Config
