import {
  StyleSheet, View, Text, Pressable,
} from 'react-native'

// Expo 內建 Icons https://icons.expo.fyi/
import { FontAwesome5 } from '@expo/vector-icons'

export default function BaseButton(props) {

  const { title, onPressFunc } = props

  function onPressHandler() {
    onPressFunc()
  }

  const buttonStyle = ({ pressed }) => {
    const { buttonPressedStyle, buttonInnerContainer } = styles
    return pressed ? [buttonInnerContainer, buttonPressedStyle] : buttonInnerContainer
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        android_ripple={{ color: 'purple' }}
        style={buttonStyle}
        onPress={onPressHandler}>
        <FontAwesome5 name="apple" size={24} color="black" style={{ marginRight: 8 }}/>
        <Text style={styles.buttonContainer}>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  buttonText: {
  },
  buttonPressedStyle: {
    opacity: 0.6,
  }
})
