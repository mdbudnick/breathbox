import React, { type FC } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { screenHeight, screenWidth } from 'windowDimensions'

interface CongratsProps {
  timeReached: boolean
  setTimeReached: (b: boolean) => void
  inputMinutes: number
  inputSeconds: number
}

const tone = new Audio('assets/audio/tone.mp3')

const styles = StyleSheet.create({
  congratulations: {
    borderWidth: 2000,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: screenWidth * (screenWidth <= 1000 ? 0.4 : 0.34),
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    zIndex: 1,
    textAlign: 'center',
    fontSize: screenHeight * 2
  },
  closeCongrats: {
    height: '20%',
    marginTop: '4%',
    borderWidth: 1,
    borderColor: 'darkgrey',
    backgroundColor: 'lightgreen',
    fontWeight: 'bold',
    padding: 5
  }
})

const Congrats: FC<CongratsProps> = (props) => {
  function closeWindow (): void {
    props.setTimeReached(false)
  }

  void tone.play()
  return (
    <View style={styles.congratulations}>
      <Text>
        Congratulations!
        {'\n'}
        You breathed for {props.inputMinutes} minutes and {props.inputSeconds}{' '}
        seconds!
      </Text>
      {'\n'}
      <Pressable style={styles.closeCongrats} onPress={closeWindow}>
        Close
      </Pressable>
    </View>
  )
}

export default Congrats
