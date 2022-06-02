import {
  StyleSheet, View, TextInput, Text
} from 'react-native'
import globalStyles from '../../styles/GlobalStyle'

export default function ExampleInput(props) {
  const { inputConfig, label } = props
  const { showHint = false, hintText = '發生一點錯誤' } = inputConfig

  function onChangeText(item) {
    inputConfig.onChangeText(item)
  }

  const baseConfig = {
    length: 3,
    keyboardType: 'number-pad',
    autoCapitalize: 'none', // 是否自動轉成大寫
    autoCorrect: false, // 是否自動修正字詞
    placeholder: '限定數字',
    onChangeText,
  }

  const combineConfig = {
    ...inputConfig,
    ...baseConfig
  }

  return (
    <>
      <Text>Label: {label}</Text>
      <TextInput {...combineConfig}></TextInput>
      <Text style={showHint ? styles.showHint : {}}>hint: {hintText}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  showHint: {
    borderWidth: 0.5,
    borderColor: 'red'
  }
})
