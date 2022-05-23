// Components
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
} from 'react-native'

// Others
import { useFonts } from 'expo-font'

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

// 載入 LoadingOverlay | ErrorOverlay
function OverlayWrapper(props) {
  const { children } = props

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
  return (
    <>
      <Router></Router>
    </>
  )
}

// react native 沒有 css 但名稱類似, 皆使用 camelcase, vscode 會自動提示
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // 讓該容器取得整個畫面 (因為他是最外層)
    backgroundColor: '#fff',
  },
})
