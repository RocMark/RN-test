import { useState } from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import ExampleInput from './ExampleInput'

export default function ExampleForm(props) {

  const [inputValues, setInputValues] = useState({
    test: '123',
    test1: '456'
  })

  // value 會由 react native 自動傳送
  function inputOnChangeHandler(key, value) {

    console.log('\x1b[36m%s\x1b[0m', '======', { key, value})

    setInputValues((previousState) => ({
      ...previousState,
      key: value
    }))
  }

  const testConfig = {
    key: 'test',
    onChangeText: inputOnChangeHandler.bind(this, 'test')
  }

  return (
    <View>
      <Text>Example Form</Text>
      <Text>test: {inputValues.test}</Text>
      {/* <Text>test1: {inputValues.test1}</Text> */}
      <ExampleInput label='test' inputConfig={testConfig}></ExampleInput>
      {/* <ExampleInput inputConfig={test1Config}></ExampleInput> */}
    </View>
  )
}

const styles = StyleSheet.create({

})
