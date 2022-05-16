import {
  StyleSheet, View
} from 'react-native'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import ExampleScreenA from '../screens/ExampleScreenA'
import ExampleScreenB from '../screens/ExampleScreenB'

const Stack = createNativeStackNavigator()

export default function Router(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExampleScreenA" component={ExampleScreenA}/>
      <Stack.Screen name="ExampleScreenB" component={ExampleScreenB}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({

})
