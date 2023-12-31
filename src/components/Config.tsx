import React, { type FC } from 'react'
import { type ConfigInput, type ConfigSetters } from 'shared'
import '../css/config.css'

interface ControlBarProps {
  started: boolean
  configInput: ConfigInput
  configSetters: ConfigSetters
}

const Config: FC<ControlBarProps> = (props) => {
  return (
    <div className={props.started ? 'config' : 'config hidden'}>
      <div className="breath-time">
        <label htmlFor="breath-time">Breathe (seconds)</label>
        <input
          type="number"
          id="breath-time"
          min="1"
          max="10"
          value={props.configInput.breathDuration}
          className={props.configInput.validBreathHoldInput ? undefined : 'red'}
          onChange={(e) => {
            props.configSetters.setBreathDuration(Number(e.target.value ?? 0))
          }}
        />
      </div>
      <div className="hold-time">
        <label htmlFor="hold">Hold (seconds)</label>
        <input
          type="number"
          id="hold-time"
          min="1"
          max="10"
          value={props.configInput.holdDuration}
          className={props.configInput.validHoldInput ? undefined : 'red'}
          onChange={(e) => {
            props.configSetters.setHoldDuration(Number(e.target.value ?? 0))
          }}
        />
      </div>
      <div className="countdown-input">
        <input
          type="number"
          id="countdown-seconds"
          min="0"
          max="45"
          value={props.configInput.inputSeconds}
          step="15"
          className={props.configInput.validTimeInput ? undefined : 'red'}
          onChange={(e) => {
            props.configSetters.setInputSeconds(Number(e.target.value ?? 0))
          }}
        />
        <label htmlFor="countdown-minutes">Time (mm:ss)</label>
        <input
          type="number"
          id="countdown-minutes"
          min="0"
          max="60"
          value={props.configInput.inputMinutes}
          className={props.configInput.validTimeInput ? undefined : 'red'}
          onChange={(e) => {
            props.configSetters.setInputMinutes(Number(e.target.value ?? 0))
          }}
        />
      </div>
      <div className="count-up-or-down">
        <label htmlFor="countdown">Count Direction</label>
        <span
          id="time-arrow"
          className={props.configInput.ascending ? 'point-up' : 'point-down'}
          onClick={() => {
            props.configSetters.setCountDirection(!props.configInput.ascending)
          }}
        >
          &#10148;
        </span>
      </div>
    </div>
  )
}

export default Config
