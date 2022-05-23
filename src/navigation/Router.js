import { useState } from 'react'
import {
  StyleSheet, SafeAreaView
} from 'react-native'

// Store
import { useSelector } from 'react-redux'

// Icon
import { FontAwesome5 } from '@expo/vector-icons'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Screens
import ExampleScreenA from '../screens/example/ExampleScreenA'
import ExampleScreenB from '../screens/example/ExampleScreenB'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function Route(props) {

  // 使用 Example 頁面
  const [useExamplePage, setUseExamplePage] = useState(false)

  // 全域 Options 在 App.js 設定, 個別需要動態或較複雜的進去 screen 本身在設定
  const defaultScreenOptions = {
    headerStyle: { backgroundColor: 'brown' }
  }

  // 使用者是否登入
  const isUserLogin = useSelector((state) => state.login.isUserLogin)

  // 取得路由
  function getCurrentStack() {
    // 測試用
    return (<AuthDrawer/>)
    // if (useExamplePage) return (<ExampleStack />)
    // if (isUserLogin) return (<AuthenticatedStack />)
    // return (<AuthStack />)
  }

  // 尚未登入時, 可進入的路由
  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    )
  }

  // 登入後, 可進入的路由
  function AuthenticatedStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    )
  }

  // 測試用
  function ExampleStack() {
    return (
      <>
        {/* initialRouteName 預設取最上面的路由為初始頁面 */}
        {/* screenOptions 全域 header 設定 */}
        <Stack.Navigator
          screenOptions={defaultScreenOptions}
          initialRouteName="ExampleScreenA">
          {/* Options https://reactnavigation.org/docs/native-stack-navigator/#options */}
          <Stack.Screen
            name="ExampleScreenA"
            component={ExampleScreenA}
            options={{ title: 'Screen A La' }}/>
          <Stack.Screen
            name="ExampleScreenB"
            component={ExampleScreenB}/>
        </Stack.Navigator>
      </>
    )
  }

  // Drawer
  function AuthDrawer() {
    const screenOptions = {
      drawerActiveBackgroundColor: '#f0e1ff',
      drawerActiveTintColor: '#3c0a6b',
      drawerStyle: { backgroundColor: 'grey' }
    }

    const labelName = (name) => `${name} Screen`

    const drawerIconStyle = {}
    const drawerScreens = [
      {
        name: 'Login',
        component: LoginScreen,
        options: {
          drawerLabel: labelName('Login'),
          drawerIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} style={drawerIconStyle}/>
        }
      },
      {
        name: 'Register',
        component: RegisterScreen,
        options: {
          drawerLabel: labelName('Register')
        }
      },
    ]

    return (
      <Drawer.Navigator screenOptions={screenOptions}>
        {drawerScreens.map((item) => (<Drawer.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={item.options}>
          </Drawer.Screen>))}
      </Drawer.Navigator>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <NavigationContainer>
        {getCurrentStack()}
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // SafeAreaView 可避免 iOS 將內容渲染在瀏海的位置, backgroundColor 會填充瀏海部分
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
})
