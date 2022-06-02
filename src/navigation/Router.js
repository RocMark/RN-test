import { useState, useEffect, useRef } from 'react'
import {
  Alert
} from 'react-native'

// Store
import { useSelector, useDispatch } from 'react-redux'

// Icon
import { FontAwesome5 } from '@expo/vector-icons'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Notifications https://docs.expo.dev/versions/latest/sdk/notifications/
import * as Notifications from 'expo-notifications'
import NotificationService from '../services/NotificationService'

// Screens
import ExampleScreenA from '../screens/example/ExampleScreenA'
import ExampleScreenB from '../screens/example/ExampleScreenB'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

// Others
import Tools from '../utils/Tools'
import {
  login, logout, checkIsUserLogin
} from '../store/modules/login'

// TODO Navigation 可以抽到各個獨立檔案
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

// 尚未登入時, 可進入的路由
function AuthTab() {
  const screenOptions = {
  }

  const labelName = (name) => `${name} Screen`

  const iconStyle = {}
  const screens = [
    {
      name: 'Login',
      component: LoginScreen,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} style={iconStyle}/>
      }
    },
    {
      name: 'Register',
      component: RegisterScreen,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} style={iconStyle}/>
      }
    },
    // Nesting Navigation (會產生兩個 Header, 需要 headerShown 隱藏)
    {
      name: 'Example',
      component: ExampleDrawer,
      options: { headerShown: false }
    },
  ]

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {screens.map((item) => (<Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options || {}}>
        </Tab.Screen>))}
    </Tab.Navigator>
  )
}

// 登入後, 可進入的路由
function AuthenticatedTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
    </Tab.Navigator>
  )
}

// 測試用
function ExampleDrawer() {
  // 全域 Options 在 App.js 設定, 個別需要動態或較複雜的進去 screen 本身在設定
  const globalScreenOptions = {
    headerStyle: { backgroundColor: 'brown' }
  }

  return (
    <>
      {/* initialRouteName 預設取最上面的路由為初始頁面 */}
      <Drawer.Navigator
        screenOptions={globalScreenOptions}
        initialRouteName="ExampleScreenA">
        <Drawer.Screen
          name="ExampleScreenA"
          component={ExampleScreenA}
          options={{ title: 'Screen A La' }}/>
        <Drawer.Screen
          name="ExampleScreenB"
          component={ExampleScreenB}/>
      </Drawer.Navigator>
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

  const iconStyle = {}
  const screens = [
    {
      name: 'Login',
      component: LoginScreen,
      options: {
        drawerLabel: labelName('Login'),
        drawerIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} style={iconStyle}/>
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
      {screens.map((item) => (<Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options || {}}>
        </Drawer.Screen>))}
    </Drawer.Navigator>
  )
}

export default function Route(props) {

  // 使用 Example 頁面
  const [useExamplePage, setUseExamplePage] = useState(false)

  // 使用者是否登入
  const isUserLogin = useSelector((state) => checkIsUserLogin(state.login.uid))
  const isTokenExpired = useSelector((state) => state.login.isTokenExpired)

  const dispatch = useDispatch()

  // 測試登入登出功能
  useEffect(() => {
    const testLogin = false
    if (testLogin) {
      console.log('\x1b[36m%s\x1b[0m', '===Route.js-TestLogin-UseEffect===')
      dispatch(login('test123'))
      setTimeout(() => {
        dispatch(logout())
      }, 5000)
    }
  }, [])

  // 登入 token 過期, 跳轉至登入頁面 (給與提示？)
  useEffect(() => {
    if (isTokenExpired) {
      Alert.alert('LoginToken 過期')
    }
  }, [isTokenExpired])

  // 測試用
  function getTestingNavigation() {
    return (<AuthTab/>)
  }

  // 取得路由
  function getCurrentStack() {

    // 取得 Expo Push Notification Token
    NotificationService.getExpoPushTokenHook()
    // 掛載通知監聽器
    const navigation = useNavigation()
    NotificationService.mountNotificationListener(navigation)

    const testing = false
    if (testing) return getTestingNavigation()

    // 登入後顯示已授權的路由
    if (isUserLogin) return (<AuthenticatedTab />)
    return (<AuthTab />)
  }

  return (
    <>
      {getCurrentStack()}
    </>
  )
}
