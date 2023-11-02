import React, { useState, type FC, type PropsWithChildren } from 'react'
import ControlBar from './ControlBar'
import Config from './Config'
import * as shared from '../ts/shared'
import { SharedIntervals } from '../ts/sharedIntervals'

const BreathBox: FC = (prop: PropsWithChildren) => {
  const [action, setActionText] = useState<string>('Breath Box')
  const [actionTransitionDuration, setActionTransitionDuration] = useState<string>('')
  const [actionTransitionTimingFunction] = useState<string>(`${shared.BREATH_CURVE}`)
  const [actionFontSize, setActionFontSize] = useState<string>('5vh')
  const [actionColor, setActionColor] = useState<string>('#f6786e')

  const actionStyle = {
    transitionDuration: actionTransitionDuration,
    transitionTimingFunction: actionTransitionTimingFunction,
    fontSize: actionFontSize,
    color: actionColor
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

  const animateBreathing = (): void => {
    const circle = document.querySelector('.circle') as HTMLElement

    const inhaleDuration = parseInt(shared.breathTimeInput.value)
    const holdInDuration = parseInt(shared.holdTimeInput.value)
    const exhaleDuration = parseInt(shared.breathTimeInput.value)
    const holdOutDuration = parseInt(shared.holdTimeInput.value)

    // Inhale (up)
    SharedIntervals.setInhaleCountdownInterval(startCountdownDecrement(
      shared.INHALE,
      inhaleDuration
    ))
    setActionTransitionDuration(`${inhaleDuration}s`)
    setActionFontSize(`${shared.INHALE_SIZE}vh`)
    setActionColor(shared.INHALE_COLOR)

    circle.style.transitionProperty =
      'height width background-color left bottom'
    circle.style.transitionDuration = `${inhaleDuration}s`
    circle.style.transitionTimingFunction = `${shared.BREATH_CURVE}`
    circle.style.backgroundColor = shared.INHALE_COLOR
    circle.style.height = `${shared.LARGE_CIRCLE_SIZE}vh`
    circle.style.width = `${shared.LARGE_CIRCLE_SIZE}vh`
    circle.style.bottom = `${shared.box.clientHeight - vhToPx(shared.LARGE_CIRCLE_SIZE) / 2
      }px`
    circle.style.left = `-${shared.LARGE_CIRCLE_SIZE / 2}vh`

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(setTimeout(() => {
      SharedIntervals.setHoldInCountdownInterval(startCountdownDecrement(
        shared.HOLD,
        holdInDuration
      ))

      circle.style.transitionDuration = `${holdInDuration}s`
      circle.style.transitionTimingFunction = 'linear'
      circle.style.left = `${shared.box.clientWidth - vhToPx(shared.LARGE_CIRCLE_SIZE) / 2
        }px`

      // Exhale (down)
      SharedIntervals.setExhaleAnimation(setTimeout(() => {
        SharedIntervals.setExhaleCountdownInterval(startCountdownDecrement(
          shared.EXHALE,
          exhaleDuration
        ))

        setActionFontSize(`${shared.EXHALE_SIZE}vh`)
        setActionColor(shared.EXHALE_COLOR)

        circle.style.transitionProperty = 'height width color left bottom'
        circle.style.transitionDuration = `${exhaleDuration}s`
        circle.style.transitionTimingFunction = `${shared.BREATH_CURVE}`
        circle.style.backgroundColor = shared.EXHALE_COLOR
        circle.style.height = `${shared.SMALL_CIRCLE_SIZE}vh`
        circle.style.width = `${shared.SMALL_CIRCLE_SIZE}vh`
        circle.style.bottom = `-${shared.SMALL_CIRCLE_SIZE / 2}vh`
        circle.style.left = `${shared.box.clientWidth - vhToPx(shared.SMALL_CIRCLE_SIZE) / 2
          }px`

        // Hold out (left)
        SharedIntervals.setHoldOutAnimation(setTimeout(() => {
          SharedIntervals.setHoldOutCountdownInterval(startCountdownDecrement(
            shared.HOLD,
            holdOutDuration
          ))

          circle.style.transitionDuration = `${holdInDuration}s`
          circle.style.transitionTimingFunction = 'linear'
          circle.style.bottom = `-${shared.SMALL_CIRCLE_SIZE / 2}vh`
          circle.style.left = `-${shared.SMALL_CIRCLE_SIZE / 2}vh`

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
      <div className="circle"></div>
    </div>
  )
}

export default BreathBox
