import { useEffect } from 'react'
import {
  Alert, Platform
} from 'react-native'

// Device
import * as Device from 'expo-device'

// Notifications https://docs.expo.dev/versions/latest/sdk/notifications/
import * as Notifications from 'expo-notifications'

export default class NotificationService {
  static async initEvents() {
    await NotificationService._mountNotificationFunction()
  }

  static isAndroid() {
    return Platform.OS === 'android'
  }

  // 初始化通知系統
  static async _mountNotificationFunction() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: true,
        shouldShowAlert: true,
      })
    })

    // 檢查 並 取得 Notification 權限
    await NotificationService.allowsNotificationsAsync()
  }

  // 檢查 並 取得 Notification 權限
  static async allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync()
    const isAllowNotification = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL

    // 沒權限則請求權限
    if (!isAllowNotification) {
      const permissionGranted = await NotificationService.requestPermissionsAsync()
      return permissionGranted
    }

    return true
  }

  // 取得 Notification 權限
  static async requestPermissionsAsync() {
    const test = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    })
    return test.granted
  }

  // 是否有開啟通知系統權限
  static async isNotificationAllowed() {
    const isAllowed = await NotificationService.requestPermissionsAsync()
    return isAllowed
  }

  // 取得被截短的訊息
  static getTruncatedMessage(message, limit) {
    const truncatedMessage = `${message.slice(0, limit)}`
    const combineMessage = message.length > limit ? `${truncatedMessage}...` : message
    return {
      count: message.length,
      message: combineMessage
    }
  }

  // 本地推播通知
  static async example() {
    // 要注意屬性支援度
    const config = {
      content: {
        title: 'Example Title',
        body: 'Example Body!',
        data: { test: 'example', redirectTo: 'Login' } // 可以傳遞 data 後續接收 信息時可用
      },
      trigger: {
        seconds: 1,
        // repeat: false, // 是否重覆
      },
    }

    const isNotificationAllowed = await NotificationService.isNotificationAllowed()
    if (isNotificationAllowed) {
      await Notifications.scheduleNotificationAsync(config)
    }
  }

  // 取得 Expo Push Notification Token
  static getExpoPushTokenHook() {
    if(!Device.isDevice) return
    useEffect(() => {

      async function configurePushNotifications() {
        const { status } = await Notifications.getPermissionsAsync()
        let finalStatus = status

        if (status !== 'granted') {
          const response = await Notifications.requestPermissionsAsync()
          finalStatus = response.status
        }

        if (status !== 'granted') {
          Alert.alert('Permission Required', '取得通知授權失敗')
          return
        }

        const token = await Notifications.getExpoPushTokenAsync()
        console.log('\x1b[36m%s\x1b[0m', '===token===', token)

        // Platform
        if (NotificationService.isAndroid()) {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT // 通知級別
          })
        }
      }

      configurePushNotifications()
    }, [])
  }

  // 掛載通知監聽器
  static mountNotificationListener(navigation) {
    useEffect(() => {

      // 當使用者收到通知時觸發
      const receivedSub = Notifications.addNotificationReceivedListener((notification) => {
        // 取得 data
        const { content: { data } } = notification.request
      })

      // 當使用者點擊通知時觸發 (預設會開啟 App)
      const responseSub = Notifications.addNotificationResponseReceivedListener((response) => {
        const { data } = response.notification.request.content
        console.log('\x1b[36m%s\x1b[0m', '===data===', data)
        // 跳轉至某個 Screen
        const { redirectTo } = data
        if (redirectTo) navigation.navigate(redirectTo)
      })

      return () => {
        receivedSub.remove()
        responseSub.remove()
      }
    }, [])
  }
}
