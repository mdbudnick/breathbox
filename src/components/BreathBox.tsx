import React, { useState, type FC, type PropsWithChildren } from 'react'
import ControlBar from './ControlBar'
import Config from './Config'
import * as shared from '../ts/shared'
import { SharedIntervals } from '../ts/sharedIntervals'
import { vhToPx } from 'vhFunc'
import { resetAnimations } from 'reset'
import {
  type ActionStyle,
  type ConfigSetters,
  type ConfigInput
} from '../ts/shared'

const BreathBox: FC = (prop: PropsWithChildren) => {
  const [action, setActionText] = useState<string>('Breath Box')
  const [actionStyle, setActionStyle] = useState<ActionStyle>({
    transitionDuration: '',
    transitionTimingFunction: `${shared.BREATH_CURVE}`,
    fontSize: '5vh',
    color: '#f6786e'
  })

  function resetActionText (): void {
    setActionText('')
    setActionStyle({
      ...actionStyle,
      fontSize: shared.DEFAULT_ACTION_FONT_SIZE,
      color: shared.RESET_ORANGE
    })
  }

  interface CircleStyle {
    transitionProperty: circleTransitionProperty
    transitionDuration: circleTransitionDuration
    transitionTimingFunction: circleTransitionTimingFunction
    backgroundColor: circleColor
    height: circleHeight
    width: circleWidth
    bottom: circleBottom
    left: circleLeft
  }

  const [circleStyle, setCircleStyle] = useState<CircleStyle>({
    transitionProperty: '',
    transitionDuration: '',
    transitionTimingFunction: shared.BREATH_CURVE,
    backgroundColor: shared.INHALE_COLOR,
    height: `${shared.SMALL_CIRCLE_SIZE}vh`,
    width: `${shared.SMALL_CIRCLE_SIZE}vh`,
    bottom: '-1vh',
    left: '-1vh'
  })

  function resetCircleStyle (): void {
    setCircleStyle({
      transitionProperty: '',
      transitionDuration: '',
      transitionTimingFunction: shared.BREATH_CURVE,
      backgroundColor: shared.INHALE_COLOR,
      height: `${shared.SMALL_CIRCLE_SIZE}vh`,
      width: `${shared.SMALL_CIRCLE_SIZE}vh`,
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
  const [timeReached, setTimeReached] = useState<boolean>(false)
  // Config Variables
  const [breathDuration, setBreathDuration] = useState<number>(3)
  const [holdDuration, setHoldDuration] = useState<number>(3)
  const [inputMinutes, setInputMinutes] = useState<number>(10)
  const [inputSeconds, setInputSeconds] = useState<number>(0)
  const [ascending, setCountDirection] = useState<boolean>(false)
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

  const animateBreathing = (): void => {
    // Inhale (up)
    SharedIntervals.setInhaleCountdownInterval(
      startCountdownDecrement(shared.INHALE, breathDuration)
    )
    setActionStyle({
      ...actionStyle,
      transitionDuration: `${breathDuration}s`,
      fontSize: `${shared.INHALE_SIZE}vh`,
      color: shared.INHALE_COLOR
    })
    setCircleStyle({
      ...circleStyle,
      transitionProperty: 'height width background-color left bottom',
      transitionDuration: `${breathDuration}s`,
      transitionTimingFunction: shared.BREATH_CURVE,
      backgroundColor: shared.INHALE_COLOR,
      height: `${shared.LARGE_CIRCLE_SIZE}vh`,
      width: `${shared.LARGE_CIRCLE_SIZE}vh`,
      bottom: `${
        shared.box.clientHeight - vhToPx(shared.LARGE_CIRCLE_SIZE) / 2
      }px`,
      left: `-${shared.LARGE_CIRCLE_SIZE / 2}vh`
    })

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(
      setTimeout(() => {
        SharedIntervals.setHoldInCountdownInterval(
          startCountdownDecrement(shared.HOLD, holdDuration)
        )

        setCircleStyle({
          ...circleStyle,
          transitionDuration: `${holdDuration}s`,
          transitionTimingFunction: 'linear',
          left: `${
            shared.box.clientWidth - vhToPx(shared.LARGE_CIRCLE_SIZE) / 2
          }px`
        })

        // Exhale (down)
        SharedIntervals.setExhaleAnimation(
          setTimeout(() => {
            SharedIntervals.setExhaleCountdownInterval(
              startCountdownDecrement(shared.EXHALE, breathDuration)
            )

            setActionStyle({
              ...actionStyle,
              fontSize: `${shared.EXHALE_SIZE}vh`,
              color: shared.EXHALE_COLOR
            })
            setCircleStyle({
              ...circleStyle,
              transitionProperty: 'height width color left bottom',
              transitionDuration: `${breathDuration}s`,
              transitionTimingFunction: shared.BREATH_CURVE,
              backgroundColor: shared.EXHALE_COLOR,
              height: `${shared.SMALL_CIRCLE_SIZE}vh`,
              width: `${shared.SMALL_CIRCLE_SIZE}vh`,
              bottom: `-${shared.SMALL_CIRCLE_SIZE / 2}vh`,
              left: `${
                shared.box.clientWidth - vhToPx(shared.SMALL_CIRCLE_SIZE) / 2
              }px`
            })

            // Hold out (left)
            SharedIntervals.setHoldOutAnimation(
              setTimeout(() => {
                SharedIntervals.setHoldOutCountdownInterval(
                  startCountdownDecrement(shared.HOLD, holdDuration)
                )

                setCircleStyle({
                  ...circleStyle,
                  transitionDuration: `${holdDuration}s`,
                  transitionTimingFunction: 'linear',
                  bottom: `-${shared.SMALL_CIRCLE_SIZE / 2}vh`,
                  left: `-${shared.SMALL_CIRCLE_SIZE / 2}vh`
                })

                SharedIntervals.setInhaleAnimation(
                  setTimeout(() => {
                    animateBreathing() // Restart the cycle
                  }, holdDuration * shared.SMOOTH_PATH_TIMING)
                )
              }, breathDuration * shared.SMOOTH_PATH_TIMING)
            )
          }, holdDuration * shared.SMOOTH_PATH_TIMING)
        )
      }, breathDuration * shared.SMOOTH_PATH_TIMING)
    )
  }

  function validInputs (): boolean {
    if (inputMinutes === 0 && inputSeconds === 0) {
      setValidTimeInput(false)
    } else {
      setValidTimeInput(true)
    }

    if (breathDuration === 0) {
      setValidBreathHoldInput(false)
    } else {
      setValidBreathHoldInput(true)
    }

    if (holdDuration === 0) {
      setValidHoldInput(false)
    } else {
      setValidHoldInput(true)
    }

    return validTimeInput && validBreathHoldInput && validHoldInput
  }

  function startBreathBox (): void {
    if (!validInputs() || started) {
      return
    }
    setStarted(true)
    resetActionText()
    resetCircleStyle()
    animateBreathing()
  }

  function stopBreathBox (): undefined {
    setStarted(false)
    resetAnimations()
    resetActionText()
    resetCircleStyle()
  }

  return (
    <div className="breath-box">
      <div className="breath-box-inner">
        <ControlBar
          started={started}
          setStarted={setStarted}
          timeReached={timeReached}
          setTimeReached={setTimeReached}
          startFn={startBreathBox}
          stopFn={stopBreathBox}
          actionStyle={actionStyle}
          setActionStyle={setActionStyle}
          setActionText={setActionText}
          resetCircleStyle={resetCircleStyle}
          configInput={configInput}
        />
        <Config
          started={started}
          configInput={configInput}
          configSetters={configSetters}
        />
        <div className="action" style={actionStyle}>
          {action}
        </div>
      </div>
      <div className="circle" style={circleStyle}></div>
    </div>
  )
}

export default BreathBox
