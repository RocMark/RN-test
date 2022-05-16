import { StyleSheet } from 'react-native'
import Colors from './Colors.android'

/**
 * 注意樣式不會像 CSS 向下傳遞
*/

const globalStyles = StyleSheet.create({
  // 常用語法範例
  exampleStyle: {
    borderColor: 'red',
    borderWidth: 3,
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16, // 會自動轉換成 px
    width: '70%', // 佔父容器的多少%
  },

  // 陰影 CSS 的 BoxShadow
  exampleBoxShadow: {
    // Android - 陰影
    elevation: 4, // 數字越大陰影越明顯

    // iOS - 陰影
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },

  // 測試用
  testStyle: {
    borderColor: 'red',
    borderWidth: 0.5,
  },

  // 頁面容器
  pageContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
  },

  // 預設 Input 樣式
  input: {
    padding: 5,
    borderColor: Colors.black,
    borderWidth: 0.5,
    width: '70%',
    textAlign: 'center',
  },
})

export default globalStyles
