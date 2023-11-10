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
import '../css/action.css'
import '../css/breathbox.css'

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

  interface CircleStyle {
    transitionProperty: string
    transitionDuration: string
    transitionTimingFunction: string
    backgroundColor: string
    height: string
    width: string
    bottom: string
    left: string
  }

  const [circleStyle, setCircleStyle] = useState<CircleStyle>({
    transitionProperty: '',
    transitionDuration: '',
    transitionTimingFunction: BREATH_CURVE,
    backgroundColor: 'rgb(245, 121, 112)',
    height: `${SMALL_CIRCLE_SIZE}vh`,
    width: `${SMALL_CIRCLE_SIZE}vh`,
    bottom: '-1vh',
    left: '-1vh'
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
      transitionProperty: 'height width background-color left bottom',
      transitionDuration: `${breathDuration}s`,
      transitionTimingFunction: BREATH_CURVE,
      backgroundColor: INHALE_COLOR,
      height: `${LARGE_CIRCLE_SIZE}vh`,
      width: `${LARGE_CIRCLE_SIZE}vh`,
      bottom: `${boxSize.height - vhToPx(LARGE_CIRCLE_SIZE) / 2}px`,
      left: `-${LARGE_CIRCLE_SIZE / 2}vh`
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
          transitionDuration: `${holdDuration}s`,
          transitionTimingFunction: 'linear',
          bottom: `${boxSize.height - vhToPx(SMALL_CIRCLE_SIZE) / 2}px`,
          left: `${boxSize.width - vhToPx(SMALL_CIRCLE_SIZE) / 2}px`
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
              transitionProperty: 'height width color left bottom',
              transitionDuration: `${breathDuration}s`,
              transitionTimingFunction: BREATH_CURVE,
              backgroundColor: EXHALE_COLOR,
              height: `${SMALL_CIRCLE_SIZE}vh`,
              width: `${SMALL_CIRCLE_SIZE}vh`,
              bottom: `-${SMALL_CIRCLE_SIZE / 2}vh`,
              left: `${boxSize.width - vhToPx(SMALL_CIRCLE_SIZE) / 2}px`
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
      key='ControlBar'
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
      key='Config'
      started={started}
      configInput={configInput}
      configSetters={configSetters}
    />
  )

  return (
    <div className="breath-box" ref={boxRef}>
      timeReached ? <Congrats timeReached={timeReached} inputMinutes={inputMinutes} inputSeconds={inputSeconds} /> : []
      <div className="breath-box-inner">
        {started ? ControlBarComponent : [ControlBarComponent, ConfigComponent]}
        <div className="action" style={actionStyle}>
          {action}
        </div>
      </div>
      <div className="circle" style={circleStyle}></div>
    </div>
  )
}

export default BreathBox
