import { useEffect } from 'react'

// Components
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet, View, SafeAreaView
} from 'react-native'

// Service
import { useFonts } from 'expo-font'

// Navigation
import { NavigationContainer } from '@react-navigation/native'

// Notifications https://docs.expo.dev/versions/latest/sdk/notifications/
import * as Notifications from 'expo-notifications'
import NotificationService from './src/services/NotificationService'

// Screens
import SplashScreen from './src/screens/global/SplashScreen'

// Store
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './src/store/store'

// Components
import LoadingOverlay from './src/components/global/LoadingOverlay'
import ErrorOverlay from './src/components/global/ErrorOverlay'

// Router
import Router from './src/navigation/Router'

// 初始化通知系統 並 請求通知的權限
NotificationService.initEvents()

// 載入字型, Redux, LoadingOverlay | ErrorOverlay
export default function AppWrapper (props) {

  const [ fontsLoaded ] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  // 字型尚未載入時, 使用 Splash Screen
  if(!fontsLoaded) return <SplashScreen />

  return (
    <>
      <StatusBar style="light"/>
      <Provider store={store}>
        <OverlayWrapper>
          <App></App>
        </OverlayWrapper>
      </Provider>
    </>
  )
}

// TODO 載入 LoadingOverlay | ErrorOverlay (要改寫成 Z-index, 暫時不用此區塊)
// https://stackoverflow.com/questions/41943191/how-to-use-zindex-in-react-native
function OverlayWrapper(props) {
  const { children } = props

  const isFetching = useSelector((state) => state.global.isFetching)
  const errorMessage = useSelector((state) => state.global.errorMessage)

  function getZIndexStyle(weight, style = {}) {
    return {
      ...style,
      // flex: 1,
      height: '100%',
      zIndex: weight, // ios
      elevation: weight, // android
      borderColor: 'red',
      borderWidth: 1,
    }
  }

  // if (isFetching) {
  //   return <LoadingOverlay></LoadingOverlay>
  // }

  // if (errorMessage && !isFetching) {
  //   return <ErrorOverlay></ErrorOverlay>
  // }

  return (
    <>
      <>{children}</>
      {/* <View style={getZIndexStyle(1)}>{children}</View> */}
      {/* <LoadingOverlay style={getZIndexStyle(999)}></LoadingOverlay> */}
      {/* <ErrorOverlay style={getZIndexStyle(0)}></ErrorOverlay> */}
    </>
  )
}

function App() {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <NavigationContainer>
        <Router></Router>
      </NavigationContainer>
    </SafeAreaView>
  )
}

// react native 沒有 css 但名稱類似, 皆使用 camelcase, vscode 會自動提示
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // 讓該容器取得整個畫面 (因為他是最外層)
    backgroundColor: '#fff',
  },
  // SafeAreaView 可避免 iOS 將內容渲染在瀏海的位置, backgroundColor 會填充瀏海部分
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
})
