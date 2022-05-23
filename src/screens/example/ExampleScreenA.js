import {
  StyleSheet, View, Text
} from 'react-native'

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Components
import BaseButton from '../../components/base/BaseButton'

export default function ExampleScreenA(props) {

  // navigation 參數 可從 Stack.Screen 提供的 props 取得, 或使用 Hook
  const navigation = useNavigation()
  const route = useRoute()

  function goToScreenB() {
    navigation.navigate('ExampleScreenB', {
      test: '890'
    })
  }

  return (
    <View>
      <BaseButton title='goToScreenB' onPressFunc={goToScreenB}></BaseButton>
      <Text>ExampleScreenA</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
