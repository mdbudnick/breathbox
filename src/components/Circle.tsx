import React, { type FC, useEffect, useState } from 'react'
import {
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
    const [circleStyle, setCircleStyle] = useState({
        width: SMALL_CIRCLE_SIZE,
        height: SMALL_CIRCLE_SIZE,
        backgroundColor: 'rgb(245, 121, 112)',
        borderRadius: 50,
        transformOrigin: 'center',
        bottom: -1,
        left: -1
    });

    return <View style={[{ position: 'absolute' }, circleStyle]} />;
}
