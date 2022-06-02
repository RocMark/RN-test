import {
  StyleSheet, View, Button
} from 'react-native'

// Service
import NotificationService from '../../services/NotificationService'

export default function ExampleScheduleBtn(props) {

  async function scheduleBtnHandler() {
    await NotificationService.example()
  }

  return (
    <View>
      <Button title="ScheduleBtn" onPress={scheduleBtnHandler}></Button>
    </View>
  )
}

const styles = StyleSheet.create({

})
