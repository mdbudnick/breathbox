import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  hidden: {
    display: 'none'
  }
})

export default commonStyles
