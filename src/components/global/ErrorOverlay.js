import {
  StyleSheet, View, Text
} from 'react-native'

export default function ErrorOverlay(props) {
  const { message } = props

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }
})
