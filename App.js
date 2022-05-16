// Components
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, SafeAreaView } from 'react-native'


// Others
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import ExampleScreenA from './src/screens/ExampleScreenA'
import ExampleScreenB from './src/screens/ExampleScreenB'

// TODO 等待抽到 Router
// import Router from './src/navigation/Router'

const Stack = createNativeStackNavigator()

export default function App() {

  const [ fontsLoaded ] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  // 自行尚未載入時, 使用 Splash Screen
  if(!fontsLoaded) return <AppLoading />


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

  return (
    <>
      <StatusBar style="light"/>
      <NavigationContainer>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          {/* <Router></Router> */}

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
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
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
