// Base
import { useState, useEffect } from 'react'
import {
  StyleSheet, View, TextInput, Button, Text, FlatList, Pressable,
  Image, ImageBackground, Alert,
  Dimensions, useWindowDimensions, Platform
} from 'react-native'

// Styles
import globalStyles from '../../styles/GlobalStyle'
import Colors from '../../styles/Colors'

// Utils
import Tools from '../../utils/Tools'
import Api from '../../services/Api'

// Custom Components
import BaseButton from '../global/BaseButton'
import BaseModal from '../global/BaseModal'

// Images
import Images from '../../../assets/images'

function triggerAlert() {
  const title = 'title'
  const message = 'message'
  function onPress() {
    console.log('123-Pressed')
  }

  // 產生原生的 Alert 元件
  Alert.alert(title, message, [
    { text: '123', style: 'cancel', onPress }
  ])
}

function item1ColorStyle(deviceWidth, index) {
  if (index === 0) return { color: Colors.item1Color(deviceWidth) }
  return {}
}

export default function ExampleComponent(props) {
  const { defaultData } = props
  const [newItem, setNewItem] = useState('')
  const [testArr, setTestArr] = useState(Tools.addIdToDataUsingUuid(defaultData))
  const [showModal, setShowModal] = useState(false)
  const [shouldTriggerAlert, setShouldTriggerAlert] = useState(false)

  const { width, height } = useWindowDimensions()

  // 元件渲染時觸發, 陣列包含的變數更動會觸發 useEffect 的內容
  useEffect(() => {
    Api.getTestData()

    // console.log('\x1b[36m%s\x1b[0m', '===Platform===', Platform.OS, Colors.primary)

    if (shouldTriggerAlert) triggerAlert()
  }, [shouldTriggerAlert])

  // console.log 會輸出在 terminal
  function inputHandler(text) {
    setNewItem(text)
  }

  // 新增項目
  function addItemHandler() {
    setTestArr((previousState) => ([...previousState, { value: newItem, id: Tools.getUuid() }]))
    setNewItem('')
    closeModal()
  }

  // 移除項目  傳遞參數必須用 bind 如果使用 func() 該 function 會被執行
  function removeItemHandler(id) {
    setTestArr((previousState) => previousState.filter((el) => el.id !== id))
  }

  function renderScrollViewItem(data) {
    return data.map((el, index) => (
      <Pressable
        android_ripple={{ color: 'purple' }}
        key={el.id}
        onPress={removeItemHandler.bind(this, el.id)}
        style={({ pressed }) => pressed && styles.pressedItem }>
        {/* Pressable 元件 按下的狀態改變時會觸發 style Function, 按下時套上 pressedItem 樣式  */}
        <View style={styles.scrollViewItem}>
          <Text style={[styles.scrollViewItemText, styles[`testArrItem-${el.id}`]]}>{el.value}</Text>
        </View>
      </Pressable>
    ))
  }

  function renderFlatListItem(el) {
    const { index, item } = el
    return (
      <Pressable
        style={{ flex: 1, borderWidth: 0.5, borderColor: 'red' }}
        android_ripple={{ color: 'purple' }}
        onPress={removeItemHandler.bind(this, item.id)}
        key={item.id}
        >
        <View style={styles.scrollViewItem}>
          <Text style={[styles.scrollViewItemText, styles[`testArrItem-${index}`], item1ColorStyle(width, index)]}>{item.value}</Text>
        </View>
      </Pressable>
    )
  }

  function clearListHandler() {
    setTestArr([])
  }

  function openModal() {
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
  }

  function exampleModalProps() {
    return {
      showModal, setShowModal, newItem, inputHandler, addItemHandler
    }
  }

  return (
    <ImageBackground
      source={Images.example.backgroundImage}
      resizeMode={'cover'}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.9 }}>
      <View style={globalStyles.pageContainer}>

        {/* 並非所有元素都可以使用 style, 每個 View 預設都使用 flexBox */}
        <Image resizeMode='cover' style={styles.image} source={Images.example.image}></Image>

        <View style={styles.modalBtnGroup}>
          <Button title='新增項目' onPress={openModal}></Button>
          <Button title ="重置資料" onPress={clearListHandler} />
        </View>

        <View style={styles.scrollViewStyle}>
          {/*
            ScrollView 會渲染他所有的子元素, 會吃效能要注意
            FlatList 只會渲染可視範圍可以用來取代 ScrollView
          */}
          {/* <ScrollView alwaysBounceVertical={true}>
            {renderScrollViewItem(testArr)}
          </ScrollView> */}

          <FlatList
            data={testArr}
            renderItem={(item) => renderFlatListItem(item)}
            keyExtractor={(item) => item.id}
            numberColumns={2}/>

        </View>
      </View>

      {/* props.children 有 slot 的功能 */}
      <BaseModal showModal={showModal}>
        <View style={styles.inputContainer}>
          {/* onChangeText ReactNative 提供的事件監聽接口 */}
          <TextInput
            multiline
            value={newItem}
            onChangeText={inputHandler}
            style={styles.textInput}
            placeholder="placeholder" />
        </View>
        <View style={styles.buttonContainer}>
          {/* Button 沒有 style & 沒有 onClick 而是 onPress 方法 */}
          <Button title ="提交" onPress={addItemHandler} />
          <Button title='取消' onPress={() => setShowModal(false)}></Button>
        </View>
      </BaseModal>
    </ImageBackground>
  )
}

// react native 沒有 css 但名稱類似, 皆使用 camelcase, vscode 會自動提示
const styles = StyleSheet.create({
  textInput: {
    ...globalStyles.input,
  },
  scrollViewStyle: {
  },
  scrollViewItem: {
    margin: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewItemButton: {
    width: '20%',
  },
  scrollViewItemText: {
    flex: 1,
  },
  'testArrItem-0': {
  },
  'testArrItem-1': {
    color: 'red',
  },
  'testArrItem-2': {
    color: 'blue',
  },
  'testArrItem-3': {
    color: 'yellow',
  },
  pressedItem: {
    opacity: 0.5,
  },
  modalBtnGroup: {
    flexDirection: 'row',
  },
  image: {
    width: '30%',
    height: '30%',
  },
  fontFamilyTextStyle: {
    fontFamily: 'open-sans-bold'
  }
})
