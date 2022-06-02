import { useState } from 'react'
import {
  StyleSheet, View, ActivityIndicator
} from 'react-native'

/**
 * 考慮改成跟 Modal 一樣 useSelector 判斷, 並使用 z-index 直接蓋上, 避免主要畫面重新渲染
 * https://www.delftstack.com/howto/react/zindex-in-react-native/
 */
export default function LoadingOverlay(props) {
  const { style } = props
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size="large"
        color="red">
      </ActivityIndicator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }
})
