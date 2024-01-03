import React, { useRef, useState, type FC, type PropsWithChildren } from 'react'
import ControlBar from './ControlBar'
import Config from './Config'
import Congrats from './Congratulations'
import { SharedIntervals } from '../ts/sharedIntervals'
import { vhToPx } from '../ts/vhFunc'
import {
  type ActionStyle,
  type ConfigSetters,
  type ConfigInput
} from '../ts/shared'
import { StyleSheet, Text, View, type ViewStyle } from 'react-native'

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
  },
  circle: {
    position: 'absolute',
    width: '2%',
    height: '2%',
    backgroundColor: 'rgb(245, 121, 112)',
    borderRadius: 50,
    transformOrigin: 'center',
    bottom: '-1%',
    left: '-1%'
  },
  action: {
    fontWeight: 'bold',
    textAlign: 'center',
    height: '10%',
    borderRadius: 3,
    opacity: 0.9,
    padding: '1%', // Adjust as needed
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0.5
  }
})

const BreathBox: FC = (prop: PropsWithChildren) => {
  const [action, setActionText] = useState<string>('Breath Box')
  const [actionStyle, setActionStyle] = useState<ActionStyle>({
    transitionDuration: '',
    transitionTimingFunction: `${BREATH_CURVE}`,
    fontSize: '5vh',
    color: RESET_ORANGE
  })

  function resetActionText (): void {
    setActionText('Breath Box')
    setActionStyle({
      ...actionStyle,
      fontSize: DEFAULT_ACTION_FONT_SIZE,
      color: RESET_ORANGE
    })
  }

  const [circleStyle, setCircleStyle] = useState<ViewStyle>({
    transitionProperty: '',
    transitionDuration: '',
    transitionTimingFunction: BREATH_CURVE,
    backgroundColor: 'rgb(245, 121, 112)',
    height: `${SMALL_CIRCLE_SIZE}%`,
    width: `${SMALL_CIRCLE_SIZE}%`,
    bottom: '-1%',
    left: '-1%'
  })

  function resetCircleStyle (): void {
    setCircleStyle({
      transitionProperty: '',
      transitionDuration: '',
      transitionTimingFunction: BREATH_CURVE,
      backgroundColor: INHALE_COLOR,
      height: `${SMALL_CIRCLE_SIZE}vh`,
      width: `${SMALL_CIRCLE_SIZE}vh`,
      bottom: '-1vh',
      left: '-1vh'
    })
  }

  const startCountdownDecrement = (
    text: string,
    time: number
  ): ReturnType<typeof setInterval> => {
    let countdownInterval: ReturnType<typeof setInterval> | null
    countdownInterval = setInterval(() => {
      --time
      if (time !== 0) {
        setActionText(text + '\r\n' + time)
      } else {
        setActionText(text)
        // It cancels itself
        clearInterval(countdownInterval!)
        countdownInterval = null
      }
    }, 1000)
    // Do it the first time
    setActionText(text + '\r\n' + time)

    return countdownInterval
  }

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

  const boxRef = useRef<HTMLDivElement>(null)
  let boxSize = { width: 0, height: 0 }
  function getBoxSize (): void {
    if (boxRef.current != null) {
      const { width, height } = boxRef.current.getBoundingClientRect()
      boxSize = { width, height }
    }
  }

  const animateBreathing = (): void => {
    // Inhale (up)
    SharedIntervals.setInhaleCountdownInterval(
      startCountdownDecrement('Inhale', breathDuration)
    )
    setActionStyle({
      ...actionStyle,
      transitionDuration: `${breathDuration}s`,
      fontSize: `${INHALE_SIZE}vh`,
      color: INHALE_COLOR
    })
    getBoxSize()
    setCircleStyle({
      ...circleStyle,
      backgroundColor: INHALE_COLOR,
      height: `${LARGE_CIRCLE_SIZE}%`,
      width: `${LARGE_CIRCLE_SIZE}%`,
      bottom: boxSize.height - vhToPx(LARGE_CIRCLE_SIZE) / 2,
      left: LARGE_CIRCLE_SIZE / 2
    })

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(
      setTimeout(() => {
        SharedIntervals.setHoldInCountdownInterval(
          startCountdownDecrement('Hold', holdDuration)
        )
        getBoxSize()
        setCircleStyle({
          ...circleStyle,
          bottom: boxSize.height - vhToPx(SMALL_CIRCLE_SIZE) / 2,
          left: boxSize.width - vhToPx(SMALL_CIRCLE_SIZE) / 2
        })

        // Exhale (down)
        SharedIntervals.setExhaleAnimation(
          setTimeout(() => {
            SharedIntervals.setExhaleCountdownInterval(
              startCountdownDecrement('Exhale', breathDuration)
            )

            setActionStyle({
              ...actionStyle,
              transitionDuration: `${breathDuration}s`,
              fontSize: `${EXHALE_SIZE}vh`,
              color: EXHALE_COLOR
            })
            getBoxSize()
            setCircleStyle({
              ...circleStyle,
              backgroundColor: EXHALE_COLOR,
              height: `${SMALL_CIRCLE_SIZE}%`,
              width: `${SMALL_CIRCLE_SIZE}%`,
              bottom: -SMALL_CIRCLE_SIZE / 2,
              left: boxSize.width - vhToPx(SMALL_CIRCLE_SIZE) / 2
            })

            // Hold out (left)
            SharedIntervals.setHoldOutAnimation(
              setTimeout(() => {
                SharedIntervals.setHoldOutCountdownInterval(
                  startCountdownDecrement('Hold', holdDuration)
                )
                setCircleStyle({
                  ...circleStyle,
                  transitionDuration: `${holdDuration}s`,
                  transitionTimingFunction: 'linear',
                  bottom: `-${SMALL_CIRCLE_SIZE / 2}vh`,
                  left: `-${SMALL_CIRCLE_SIZE / 2}vh`
                })

                SharedIntervals.setInhaleAnimation(
                  setTimeout(() => {
                    animateBreathing() // Restart the cycle
                  }, holdDuration * SMOOTH_PATH_TIMING)
                )
              }, breathDuration * SMOOTH_PATH_TIMING)
            )
          }, holdDuration * SMOOTH_PATH_TIMING)
        )
      }, breathDuration * SMOOTH_PATH_TIMING)
    )
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
    resetActionText()
    resetCircleStyle()
    animateBreathing()
  }

  function stopBreathBox (): void {
    setStarted(false)
    setPaused(false)
    SharedIntervals.resetAnimations()
    resetActionText()
    resetCircleStyle()
  }

  function pauseBreathBox (): void {
    SharedIntervals.resetAnimations()
    setPaused(true)
    setActionText('Paused')
    setActionStyle({ ...actionStyle, color: '#ff8c00' })
    resetCircleStyle()
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
      setActionText={setActionText}
      resetCircleStyle={resetCircleStyle}
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
        <Text style={styles.action}>{action}</Text>
      </View>
      <View style={[styles.circle, circleStyle]}></View>
    </View>
  )
}

export default BreathBox
