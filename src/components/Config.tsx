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
  const roundAndSetInputSeconds = (value: string): number => {
    const numericValue = Number(value)

    // Enforce minimum and maximum values and step
    const minValue = 0
    const maxValue = 45
    const stepValue = 15

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(minValue, numericValue), maxValue)
      const roundedValue = Math.round(clampedValue / stepValue) * stepValue

      props.configSetters.setInputSeconds(roundedValue)
      return roundedValue
    } else {
      props.configSetters.setInputSeconds(minValue)
      return minValue
    }
  }

  const roundAndSetInputMinutes = (value: string): number => {
    const numericValue = Number(value)

    // Enforce minimum and maximum values and step
    const minValue = 1
    const maxValue = 60

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(minValue, numericValue), maxValue)

      props.configSetters.setInputSeconds(clampedValue)
      return clampedValue
    } else {
      // 10 minute default
      props.configSetters.setInputSeconds(10)
      return 10
    }
  }

  return (
    <View style={props.started ? styles.config : [styles.config, commonStyles.hidden]}>
      <View>
        <Text>Breathe (seconds)</Text>
        <TextInput
          style={props.configInput.validBreathHoldInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(value) => { props.configSetters.setBreathDuration(Number(value)) }}
          value={props.configInput.breathDuration.toString()}
        />
      </View>
      <View>
        <Text>Hold (seconds)</Text>
        <TextInput
          style={props.configInput.validHoldInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(value) => { props.configSetters.setHoldDuration(Number(value)) }}
          value={props.configInput.holdDuration.toString()}
        />
      </View>
      <View>
        <Text>Countdown Seconds</Text>
        <TextInput
          style={props.configInput.validTimeInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => roundAndSetInputSeconds(value)}
          value={props.configInput.inputSeconds.toString()}
        />
        <Text>Time (mm:ss)</Text>
        <TextInput
          style={props.configInput.validTimeInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => roundAndSetInputMinutes(value)}
          value={props.configInput.inputMinutes.toString()}
        />
      </View>
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
