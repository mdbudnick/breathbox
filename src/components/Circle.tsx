import React, { type FC, useEffect, useRef, useState } from 'react'
import {
    Animated,
    StyleSheet,
    View
} from 'react-native'

const LARGE_CIRCLE_SIZE = 6
const SMALL_CIRCLE_SIZE = 2

const SMOOTH_PATH_TIMING = 1000
const BREATH_CURVE = 'cubic-bezier(.13,.38,.48,1.02)'

interface CircleProps {
    running: boolean
    boundingHeight: number
    boundingWidth: number
}

const styles = StyleSheet.create({
    circle: 
})

const Circle: FC<CircleProps> = (props) => {
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
    });

    const toBottomLeft = Animated.parallel([
        Animated.timing(circleBottom, {
            toValue: props.boundingHeight,
            duration: 1000,
            useNativeDriver: false,
        }),
        Animated.timing(circleLeft, {
            toValue: -(SMALL_CIRCLE_SIZE / 2),
            duration: 1000,
            useNativeDriver: false,
        })
    ])
    const toTopLeft = Animated.parallel([
        Animated.timing(circleBottom, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: false,
        }),
        Animated.timing(circleLeft, {
            toValue: -(SMALL_CIRCLE_SIZE / 2),
            duration: 1000,
            useNativeDriver: false,
        })
    ])

    const clockWiseAnimation = Animated.sequence([
        toBottomLeft,
        toTopLeft
    ])

    useEffect(() => {
        if (props.running) {
            clockWiseAnimation.start()
        } else {
            clockWiseAnimation.reset()
        }
    }, [props.running])

    useEffect(() => {
        setCircleStyle({
          ...circleStyle,
          bottom: parseInt(JSON.stringify(circleBottom)), 
          left: parseInt(JSON.stringify(circleLeft)),
        });
      }, [circleBottom, circleLeft])

    return <View style={[{ position: 'absolute' }, circleStyle]} />;
}
