import {
  StyleSheet, View, Text, Pressable,
} from 'react-native'

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Expo 內建 Icons https://icons.expo.fyi/
import { FontAwesome5 } from '@expo/vector-icons'

export default function LoginBtn(props) {
  const { type } = props

  const navigation = useNavigation()

  const config = (oauthType) => {
    const baseConfig = {
      iconName: oauthType,
      title: `使用 ${oauthType} 繼續`
    }
    if (oauthType === 'facebook') {
      return {
        ...baseConfig
      }
    }

    if (oauthType === 'google') {
      return {
        ...baseConfig
      }
    }

    if (oauthType === 'apple') {
      return {
        ...baseConfig
      }
    }

    return {}
  }

  const buttonStyle = ({ pressed }) => {
    const { buttonPressedStyle, buttonInnerContainer } = styles
    return pressed ? [buttonInnerContainer, buttonPressedStyle] : buttonInnerContainer
  }

  // TODO 導向至第三方登入網址
  function onPressHandler() {
    const isLogin = true
    if (isLogin) {
      navigation.replace('Welcome')
    }
    if (!isLogin) {
      navigation.replace('Register')
    }
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        android_ripple={{ color: 'purple' }}
        style={buttonStyle}
        onPress={onPressHandler}>
        <FontAwesome5 name={config(type).iconName} size={24} color="black" style={{ margin: 8 }}/>
        <Text style={styles.buttonContainer}>{config(type).title}</Text>
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
