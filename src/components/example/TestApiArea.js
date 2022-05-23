import { useEffect } from 'react'
import {
  StyleSheet, View
} from 'react-native'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { setExampleData } from '../../store/modules/example'

// Services
import Api from '../../services/Api'

export default function TestApiArea(props) {

  const dispatch = useDispatch()
  const exampleData = useSelector((state) => state.example.data)

  useEffect(() => {
    if (!exampleData) {
      // 發 API 修改 isFetching 變數, 渲染 Loading 元件 => API 回來後 渲染 App 元件 => 發送 API
      Api.test()
        .then((res) => {
          dispatch(setExampleData(res.data))
        })
    }
  }, [exampleData])

  return (
    <View>

    </View>
  )
}
