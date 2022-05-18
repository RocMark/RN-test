import {
  StyleSheet, View, Modal, Text
} from 'react-native'

// Store
import { useSelector } from 'react-redux'

// Component
import BaseModal from '../global/BaseModal'

/*
 * 開啟 Modal: dispatch(setActiveTarget('ExampleModal'))
 * 關閉 Modal: dispatch(clearActiveTarget())
*/

export default function ExampleModal(props) {
  const showModal = useSelector((state) => state.modal.activeTarget === 'ExampleModal')

  return (
    <BaseModal showModal={showModal}>
      <Text>123</Text>
    </BaseModal>
  )
}

const styles = StyleSheet.create({

})
