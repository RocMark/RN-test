// Components
import { StrictMode, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet, View, SafeAreaView, FlatList, Text
} from 'react-native'

// Others
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

// Services
import Tools from './src/utils/Tools'
import Api from './src/services/Api'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import ExampleScreenA from './src/screens/ExampleScreenA'
import ExampleScreenB from './src/screens/ExampleScreenB'
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import SplashScreen from './src/screens/global/SplashScreen'

// Store
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './src/store/store'
import { setActiveTarget, clearActiveTarget } from './src/store/modules/modal'

// Components
import LoadingOverlay from './src/components/global/LoadingOverlay'
import ErrorOverlay from './src/components/global/ErrorOverlay'
import ExampleModal from './src/components/modal/ExampleModal'

// TODO 等待抽到 Router
// import Router from './src/navigation/Router'

const Stack = createNativeStackNavigator()

export default function AppWrapper () {
  return (
    <>
      <StatusBar style="light"/>
      <Provider store={store}>
        <OverlayWrapper>
          <App></App>
          <ExampleModal></ExampleModal>
        </OverlayWrapper>
      </Provider>
    </>
  )
}

function OverlayWrapper({ children }) {


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveTarget('ExampleModal'))
    setTimeout(() => {
      dispatch(clearActiveTarget())
    }, 5000)

    // 元件重新渲染所以一直觸發
    // Api.getTestData()
  }, [])

  const isFetching = useSelector((state) => state.global.isFetching)
  const errorMessage = useSelector((state) => state.global.errorMessage)

  if (isFetching) {
    return <LoadingOverlay></LoadingOverlay>
  }

  if (errorMessage && !isFetching) {
    return <ErrorOverlay></ErrorOverlay>
  }

  return (
    <>{children}</>
  )
}

function App() {

  const [ fontsLoaded ] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  // 自行尚未載入時, 使用 Splash Screen
  if(!fontsLoaded) return <SplashScreen />

  // 全域 Options 在 App.js 設定, 個別需要動態或較複雜的進去 screen 本身在設定
  const defaultScreenOptions = {
    headerStyle: { backgroundColor: 'brown' }
  }

  const screenAOptions = {
    title: 'Screen A La',
  }

  // 動態 Header Options (亦可在 Screen 內進行設定)
  const screenBOptions = ({ route, navigation }) => {
    const { test } = route.params
    return {
      title: `Screen B La ${test}`
    }
  }

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    );
  }

  function ExampleStack() {
    return (
      <NavigationContainer>
        {/* 預設最上面的路由為初始頁面 */}
        {/* screenOptions 全域 header 設定 */}
        <Stack.Navigator
          screenOptions={defaultScreenOptions}
          initialRouteName="ExampleScreenA">
          {/* Options https://reactnavigation.org/docs/native-stack-navigator/#options */}
          <Stack.Screen
            name="ExampleScreenA"
            component={ExampleScreenA}
            options={screenAOptions}/>
          <Stack.Screen
            name="ExampleScreenB"
            component={ExampleScreenB}
            options={screenBOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  function Navigation() {
    return (
      <NavigationContainer>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <AuthStack />
        </SafeAreaView>
      </NavigationContainer>
    );
  }

  return (
    <>
      <Navigation />
    </>
  )
}

// react native 沒有 css 但名稱類似, 皆使用 camelcase, vscode 會自動提示
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // 讓該容器取得整個畫面 (因為他是最外層)
    backgroundColor: '#fff',
  },
  // iOS 避免將內容渲染在瀏海的位置, backgroundColor 會填充瀏海部分
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
})
