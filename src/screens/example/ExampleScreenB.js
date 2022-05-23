import { useEffect, useLayoutEffect } from 'react'
import {
  StyleSheet, View, Text, Button
} from 'react-native'

// Navigation
import { useRoute } from '@react-navigation/native'

// Components
import ExampleComponent from '../../components/example/ExampleComponent'

// 不會變動的建議放在元件之外, 避免重新渲染吃掉不必要的資源
const headerRightComponent = () => <Button title="123"></Button>

export default function ExampleScreenB(props) {
  const { route, navigation } = props

  useEffect(() => {
    // console.log('\x1b[36m%s\x1b[0m', '===useEffect 渲染後觸發, 大多用此===')
  }, [])

  // useEffect 會在渲染完成後才觸發, header 應該要在渲染時就進行修改
  // https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/ 兩者比較
  useLayoutEffect(() => {
    // console.log('\x1b[36m%s\x1b[0m', '===useLayoutEffect 渲染前觸發, 用於畫面交互===')
    navigation.setOptions({
      title: `ScreenB - ${route.params.test}`,
      headerRight: headerRightComponent
    })
  }, [navigation])

  // 等同 Screen 元件 props 傳下來的 route
  const routeExample = useRoute()

  return (
    <View style={{ flex: 1 }}>
      {/* 並非所有元素都可以使用 style, 每個 View 預設都使用 flexBox, 只會取其所需的空間不會 stretch */}
      {/* style: light | dark */}
      <ExampleComponent defaultData={['demo']} />
    </View>
  )
}

const styles = StyleSheet.create({
})
