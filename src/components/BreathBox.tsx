import React, { useState, type FC, type PropsWithChildren } from 'react'
import ControlBar from './ControlBar'
import Config from './Config'
import * as shared from '../ts/shared'
import { SharedIntervals } from '../ts/sharedIntervals'
import { vhToPx } from 'vhFunc'

const BreathBox: FC = (prop: PropsWithChildren) => {
  interface ActionStyle {
    transitionDuration: string
    transitionTimingFunction: string
    fontSize: string
    color: string
  }

  const [action, setActionText] = useState<string>('Breath Box')
  const [actionStyle, setActionStyle] = useState<ActionStyle>({
    transitionDuration: '',
    transitionTimingFunction: `${shared.BREATH_CURVE}`,
    fontSize: '5vh',
    color: '#f6786e'
  })

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

  const animateBreathing = (): void => {
    const inhaleDuration = parseInt(shared.breathTimeInput.value)
    const holdInDuration = parseInt(shared.holdTimeInput.value)
    const exhaleDuration = parseInt(shared.breathTimeInput.value)
    const holdOutDuration = parseInt(shared.holdTimeInput.value)

    // Inhale (up)
    SharedIntervals.setInhaleCountdownInterval(startCountdownDecrement(
      shared.INHALE,
      inhaleDuration
    ))
    setActionStyle({ ...actionStyle, transitionDuration: `${inhaleDuration}s`, fontSize: `${shared.INHALE_SIZE}vh`, color: shared.INHALE_COLOR })
    setCircleStyle({
      ...circleStyle,
      transitionProperty: 'height width background-color left bottom',
      transitionDuration: `${inhaleDuration}s`,
      transitionTimingFunction: shared.BREATH_CURVE,
      backgroundColor: shared.INHALE_COLOR,
      height: `${shared.LARGE_CIRCLE_SIZE}vh`,
      width: `${shared.LARGE_CIRCLE_SIZE}vh`,
      bottom: `${shared.box.clientHeight - vhToPx(shared.LARGE_CIRCLE_SIZE) / 2}px`,
      left: `-${shared.LARGE_CIRCLE_SIZE / 2}vh`
    })

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(setTimeout(() => {
      SharedIntervals.setHoldInCountdownInterval(startCountdownDecrement(
        shared.HOLD,
        holdInDuration
      ))

      setCircleStyle({
        ...circleStyle,
        transitionDuration: `${holdInDuration}s`,
        transitionTimingFunction: 'linear',
        left: `${shared.box.clientWidth - vhToPx(shared.LARGE_CIRCLE_SIZE) / 2}px`
      })

      // Exhale (down)
      SharedIntervals.setExhaleAnimation(setTimeout(() => {
        SharedIntervals.setExhaleCountdownInterval(startCountdownDecrement(
          shared.EXHALE,
          exhaleDuration
        ))

        setActionStyle({ ...actionStyle, fontSize: `${shared.EXHALE_SIZE}vh`, color: shared.EXHALE_COLOR })
        setCircleStyle({
          ...circleStyle,
          transitionProperty: 'height width color left bottom',
          transitionDuration: `${exhaleDuration}s`,
          transitionTimingFunction: shared.BREATH_CURVE,
          backgroundColor: shared.EXHALE_COLOR,
          height: `${shared.SMALL_CIRCLE_SIZE}vh`,
          width: `${shared.SMALL_CIRCLE_SIZE}vh`,
          bottom: `-${shared.SMALL_CIRCLE_SIZE / 2}vh`,
          left: `${shared.box.clientWidth - vhToPx(shared.SMALL_CIRCLE_SIZE) / 2}px`
        })

        // Hold out (left)
        SharedIntervals.setHoldOutAnimation(setTimeout(() => {
          SharedIntervals.setHoldOutCountdownInterval(startCountdownDecrement(
            shared.HOLD,
            holdOutDuration
          ))

          setCircleStyle({
            ...circleStyle,
            transitionDuration: `${holdInDuration}s`,
            transitionTimingFunction: 'linear',
            bottom: `-${shared.SMALL_CIRCLE_SIZE / 2}vh`,
            left: `-${shared.SMALL_CIRCLE_SIZE / 2}vh`
          })

          SharedIntervals.setInhaleAnimation(setTimeout(() => {
            animateBreathing() // Restart the cycle
          }, holdOutDuration * shared.SMOOTH_PATH_TIMING))
        }, exhaleDuration * shared.SMOOTH_PATH_TIMING))
      }, holdInDuration * shared.SMOOTH_PATH_TIMING))
    }, inhaleDuration * shared.SMOOTH_PATH_TIMING))
  }

  return (
    <div className="breath-box">
      <div className="breath-box-inner">
        <ControlBar />
        <Config />
        <div className="action" style={actionStyle} >{action}</div>
      </div>
      <div className="circle" style={circleStyle}></div>
    </div>
  )
}

export default BreathBox
