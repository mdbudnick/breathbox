import React, { useState, type FC, type PropsWithChildren } from 'react'
import ActionText from './ActionText'
import Circle from './Circle'
import ControlBar from './ControlBar'
import Config from './Config'
import Congrats from './Congratulations'
import { SharedIntervals } from '../ts/sharedIntervals'
import {
  type ConfigSetters,
  type ConfigInput
} from '../ts/shared'
import { StyleSheet, View } from 'react-native'

const INHALE_COLOR = '#0f5362'
const EXHALE_COLOR = '#c08845'
const RESET_ORANGE = '#f6786e'

const LARGE_CIRCLE_SIZE = 6
const SMALL_CIRCLE_SIZE = 2

const SMOOTH_PATH_TIMING = 1000
const BREATH_CURVE = 'cubic-bezier(.13,.38,.48,1.02)'

const INHALE_SIZE = 8
const EXHALE_SIZE = 4
const DEFAULT_ACTION_FONT_SIZE = '5vh'

const styles = StyleSheet.create({
  breathBox: {
    position: 'relative',
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderColor: '#f6786e'
  },
  breathBoxInner: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    // backgroundImage: require('../img/buddha-gnome.jpg'),
    resizeMode: 'cover',
    justifyContent: 'center'
  }
})

const BreathBox: FC = (prop: PropsWithChildren) => {
  const [started, setStarted] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [timeReached, setTimeReached] = useState<boolean>(false)
  // Config Variables
  const [breathDuration, setBreathDuration] = useState<number>(3)
  const [holdDuration, setHoldDuration] = useState<number>(3)
  const [inputMinutes, setInputMinutes] = useState<number>(10)
  const [inputSeconds, setInputSeconds] = useState<number>(0)
  const [ascending, setCountDirection] = useState<boolean>(true)
  const [validTimeInput, setValidTimeInput] = useState<boolean>(true)
  const [validBreathHoldInput, setValidBreathHoldInput] =
    useState<boolean>(true)
  const [validHoldInput, setValidHoldInput] = useState<boolean>(true)
  const configInput: ConfigInput = {
    breathDuration,
    holdDuration,
    inputMinutes,
    inputSeconds,
    ascending,
    validTimeInput,
    validBreathHoldInput,
    validHoldInput
  }
  const configSetters: ConfigSetters = {
    setBreathDuration,
    setHoldDuration,
    setInputMinutes,
    setInputSeconds,
    setCountDirection
  }

  function validInputs (): boolean {
    let valid = true
    if (inputMinutes === 0 && inputSeconds === 0) {
      setValidTimeInput(false)
      valid = false
    } else {
      setValidTimeInput(true)
    }

    if (breathDuration === 0) {
      setValidBreathHoldInput(false)
      valid = false
    } else {
      setValidBreathHoldInput(true)
    }

    if (holdDuration === 0) {
      setValidHoldInput(false)
      valid = false
    } else {
      setValidHoldInput(true)
    }

    return valid
  }

  function startBreathBox (): void {
    if (!validInputs() || (started && !paused)) {
      return
    }
    setStarted(true)
    setPaused(false)
  }

  function stopBreathBox (): void {
    setStarted(false)
    setPaused(false)
  }

  function pauseBreathBox (): void {
    SharedIntervals.resetAnimations()
    setPaused(true)
    setActionText('Paused')
  }

  const ControlBarComponent = (
    <ControlBar
      key="ControlBar"
      started={started}
      setStarted={setStarted}
      paused={paused}
      timeReached={timeReached}
      setTimeReached={setTimeReached}
      startFn={startBreathBox}
      stopFn={stopBreathBox}
      pauseFn={pauseBreathBox}
      actionStyle={actionStyle}
      setActionStyle={setActionStyle}
      configInput={configInput}
    />
  )
  const ConfigComponent = (
    <Config
      key="Config"
      started={started}
      configInput={configInput}
      configSetters={configSetters}
    />
  )

  return (
    <View style={styles.breathBox}>
      {timeReached
        ? (
        <Congrats
          timeReached={timeReached}
          setTimeReached={setTimeReached}
          inputMinutes={inputMinutes}
          inputSeconds={inputSeconds}
        />
          )
        : (
            []
          )}
      <View style={styles.breathBoxInner}>
        {started ? ControlBarComponent : [ControlBarComponent, ConfigComponent]}
        <ActionText></ActionText>
      </View>
      <Circle></Circle>
    </View>
  )
}

export default BreathBox
