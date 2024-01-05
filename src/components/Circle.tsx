import React, { type FC, useEffect, useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'

const LARGE_CIRCLE_SIZE = 6
const SMALL_CIRCLE_SIZE = 2

const SMOOTH_PATH_TIMING = 1000
const BREATH_CURVE = Easing.bezier(0.13, 0.38, 0.48, 1.02)

interface CircleProps {
  running: boolean
  boundingHeight: number
  boundingWidth: number
}

const Circle: FC<CircleProps> = (props) => {
  const circleSize = useRef(new Animated.Value(SMALL_CIRCLE_SIZE)).current
  const circleBottom = useRef(new Animated.Value(props.boundingHeight)).current
  const circleLeft = useRef(new Animated.Value(0)).current

  const [circleStyle, setCircleStyle] = useState({
    width: SMALL_CIRCLE_SIZE,
    height: SMALL_CIRCLE_SIZE,
    backgroundColor: 'rgb(245, 121, 112)',
    borderRadius: 50,
    transformOrigin: 'center',
    bottom: props.boundingHeight,
    left: props.boundingWidth
  })

  const toBottomLeft = Animated.parallel([
    Animated.timing(circleSize, {
      toValue: SMALL_CIRCLE_SIZE,
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    }),
    Animated.timing(circleBottom, {
      toValue: props.boundingHeight,
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    }),
    Animated.timing(circleLeft, {
      toValue: -(SMALL_CIRCLE_SIZE / 2),
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    })
  ])
  const toTopLeft = Animated.parallel([
    Animated.timing(circleSize, {
      toValue: LARGE_CIRCLE_SIZE,
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    }),
    Animated.timing(circleBottom, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: false
    }),
    Animated.timing(circleLeft, {
      toValue: -(SMALL_CIRCLE_SIZE / 2),
      duration: 1000,
      useNativeDriver: false
    })
  ])

  const clockWiseAnimation = Animated.sequence([toBottomLeft, toTopLeft])

  useEffect(() => {
    if (props.running) {
      clockWiseAnimation.start()
    } else {
      clockWiseAnimation.reset()
    }
  }, [props.running])

  useEffect(() => {
    const diameter = parseInt(JSON.stringify(circleSize))
    setCircleStyle({
      ...circleStyle,
      width: diameter,
      height: diameter,
      bottom: parseInt(JSON.stringify(circleBottom)),
      left: parseInt(JSON.stringify(circleLeft))
    })
  }, [circleSize, circleBottom, circleLeft])

  return <View style={[{ position: 'absolute' }, circleStyle]} />
}

export default Circle
