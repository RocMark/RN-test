import {
  StyleSheet, View
} from 'react-native'
import LoginBtn from './LoginBtn'

export default function LoginBtnGroup(props) {
  return (
    <View>
      <LoginBtn type="facebook"></LoginBtn>
      <LoginBtn type="google"></LoginBtn>
      <LoginBtn type="apple"></LoginBtn>
    </View>
  )
}

const styles = StyleSheet.create({

})
