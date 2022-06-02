import {
  StyleSheet, View, Text, BackHandler
} from 'react-native'

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Components
import BaseButton from '../../components/base/BaseButton'
import ExampleScheduleBtn from '../../components/example/ExampleScheduleBtn'
import ExampleForm from '../../components/example/ExampleForm'

// Services
import Tools from '../../utils/Tools'

export default function ExampleScreenA(props) {

  // navigation 參數 可從 Stack.Screen 提供的 props 取得, 或使用 Hook
  const navigation = useNavigation()
  const route = useRoute()

  function goToScreenB() {
    navigation.navigate('ExampleScreenB', {
      test: '890'
    })
  }

  // 硬體上一步按鈕 (Android-only) | iOS 沒有 | 通常也不會用按鈕去關閉 App
  function leaveApp() {
    BackHandler.exitApp() // https://reactnative.dev/docs/backhandler
  }

  return (
    <View>
      <BaseButton title='goToScreenB' onPressFunc={goToScreenB}></BaseButton>
      <BaseButton title='Leave App' onPressFunc={leaveApp}></BaseButton>
      <ExampleScheduleBtn></ExampleScheduleBtn>
      <ExampleForm></ExampleForm>
    </View>
  )
}

const styles = StyleSheet.create({

})
