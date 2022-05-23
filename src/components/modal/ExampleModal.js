import {
  StyleSheet, View, Modal, Text
} from 'react-native'

// Store
import { useSelector } from 'react-redux'

// Component
import BaseModal from '../base/BaseModal'

/*
 * 開啟 Modal: dispatch(setActiveTarget('ExampleModal'))
 * 關閉 Modal: dispatch(clearActiveTarget())
 * 記得要: import { setActiveTarget, clearActiveTarget } from 'modal'
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
