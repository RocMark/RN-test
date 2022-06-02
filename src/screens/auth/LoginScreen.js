import {
  StyleSheet, View, Button
} from 'react-native'

import LoginBtnGroup from '../../components/login/LoginBtnGroup'

export default function LoginScreen({ route, navigation }) {

  return (
    <View>
      <LoginBtnGroup></LoginBtnGroup>
      {/* <Button title='開啟 Drawer' onPress={() => navigation.toggleDrawer()}>Drawer</Button> */}
    </View>
  )
}

const styles = StyleSheet.create({

})
