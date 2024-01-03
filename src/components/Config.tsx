import React, { type FC } from 'react'
import { type ConfigInput, type ConfigSetters } from 'shared'
import {
  StyleSheet, Text, TextInput, View
} from 'react-native'
import commonStyles from '../styles/stylesheet'

interface ControlBarProps {
  started: boolean
  configInput: ConfigInput
  configSetters: ConfigSetters
}

const styles = StyleSheet.create({
  config: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: '5%',
    color: 'white',
    height: '12%'
  },
  pointDown: {
    transform: [{ rotate: '90deg' }]
  },
  pointUp: {
    transform: [{ rotate: '-90deg' }]
  }
})

const Config: FC<ControlBarProps> = (props) => {
  return (
    <View style={props.started ? styles.config : [styles.config, commonStyles.hidden]}>
      <View>
        <Text>Breathe (seconds)</Text>
        <TextInput
          style={props.configInput.validBreathHoldInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          onChangeText={(value) => { props.configSetters.setBreathDuration(Number(value)) }}
          value={props.configInput.breathDuration.toString()}
        />
      </View>
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
    </View>
  )
}

export default Config
