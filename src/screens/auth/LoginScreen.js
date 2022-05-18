import {
  StyleSheet, View
} from 'react-native'

import LoginBtnGroup from '../../components/login/LoginBtnGroup'

export default function LoginScreen({ route, navigation }) {
  return (
    <View>
      <LoginBtnGroup></LoginBtnGroup>
    </View>
  )
}

const styles = StyleSheet.create({

})
