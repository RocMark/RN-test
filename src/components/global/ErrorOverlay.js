import {
  StyleSheet, View, Text, Button
} from 'react-native'

// Store
import { useSelector, useDispatch } from 'react-redux'
import { clearErrorMessage } from '../../store/modules/global'

/**
 * 考慮改成跟 Modal 一樣 useSelector 判斷, 並使用 z-index 直接蓋上, 避免主要畫面重新渲染
 * https://www.delftstack.com/howto/react/zindex-in-react-native/
 */
export default function ErrorOverlay(props) {
  const { message } = props

  const dispatch = useDispatch()

  function closeErrorOverlay() {
    dispatch(clearErrorMessage())
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button title='關閉' onPress={closeErrorOverlay}></Button>
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
