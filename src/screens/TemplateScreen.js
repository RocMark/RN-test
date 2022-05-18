import { useEffect, useLayoutEffect } from 'react'
import {
  StyleSheet, View
} from 'react-native'

export default function Screen({ route, navigation }) {

  // 客製化 Screen Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Screen',
    })
  }, [navigation])

  return (
    <View>
      {/* 貼至 App.js */}
      <Stack.Screen
        name="Screen"
        component={Screen} />
    </View>
  )
}

const styles = StyleSheet.create({

})
