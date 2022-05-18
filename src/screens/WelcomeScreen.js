import { useEffect, useLayoutEffect } from 'react'
import {
  StyleSheet, View
} from 'react-native'

export default function WelcomeScreen({ route, navigation }) {

  // 客製化 Screen Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'WelcomeScreen',
    })
  }, [navigation])

  return (
    <View>
    </View>
  )
}

const styles = StyleSheet.create({

})
