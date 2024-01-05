import React, { type FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

const INHALE_COLOR = '#0f5362'
const EXHALE_COLOR = '#c08845'
const RESET_ORANGE = '#f6786e'

const INHALE_SIZE = 8
const EXHALE_SIZE = 4
const DEFAULT_ACTION_FONT_SIZE = 5
const DEFAULT_TEXT = 'Breath Box'
const PAUSE_TEXT = 'Paused'

const styles = StyleSheet.create({
  action: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: DEFAULT_ACTION_FONT_SIZE,
    color: RESET_ORANGE,
    borderRadius: 3,
    opacity: 0.9,
    padding: '1%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0.5
  }
})

interface ActionTextProps {
  started: boolean
  paused: boolean
  inhale: boolean
  holdInhale: boolean
  exhale: boolean
  holdExhale: boolean
}

const ActionText: FC<ActionTextProps> = (props) => {
  const textSize = useRef(new Animated.Value(DEFAULT_ACTION_FONT_SIZE)).current

  const [actionText, setActionText] = useState(DEFAULT_TEXT)
  const [textStyle, setTextStyle] = useState(styles.action)

  useEffect(() => {
    if (!props.started) {
    setActionText(DEFAULT_TEXT)
    }
  }, [props.started])

  useEffect(() => {
    if (props.started && props.paused) {
    setActionText(PAUSE_TEXT)
    }
  }, [props.paused])

  useEffect(() => {
    setActionText('Inhale')
    setTextStyle({ ...textStyle, color: INHALE_COLOR })
  }, [props.inhale])

  useEffect(() => {
    setActionText('Hold')
    setTextStyle({ ...textStyle, color: INHALE_COLOR })
  }, [props.holdInhale])

  useEffect(() => {
    setActionText('Exhale')
    setTextStyle({ ...textStyle, color: EXHALE_COLOR })
  }, [props.exhale])

  useEffect(() => {
    setActionText('Hold')
    setTextStyle({ ...textStyle, color: EXHALE_COLOR })
  }, [props.holdExhale])

  return <Text style={[styles.action, textStyle]}>{actionText}</Text>
}

export default ActionText
