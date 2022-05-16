import {
  StyleSheet, View, TextInput
} from 'react-native'
import globalStyles from '../../styles/GlobalStyle'

export default function ExampleInput(props) {
  return (
    <>
      <TextInput
        length={3}
        keyboardType="number-pad"
        autoCapitalize='none' // 自動轉成大寫
        autoCorrect={false} // 自動修正字詞
        placeholder={'限定數字'}></TextInput>
    </>
  )
}

const styles = StyleSheet.create({

})
