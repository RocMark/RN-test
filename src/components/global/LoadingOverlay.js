import { useState } from 'react'
import {
  StyleSheet, View, ActivityIndicator
} from 'react-native'

export default function LoadingOverlay() {

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="red">
      </ActivityIndicator>
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
