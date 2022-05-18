import {
  StyleSheet, View
} from 'react-native'

export default function SplashScreen({ route, navigation }) {

  // 2022/05/18 iOS 虛擬機 使用 AppLoading 會造成錯誤, 因此自行建立 SplashScreen 等待修正
  // https://stackoverflow.com/questions/68823075/error-no-native-splash-screen-registered-for-given-view-controller-for-react-n

  return (
    <View>
    </View>
  )
}

const styles = StyleSheet.create({

})
