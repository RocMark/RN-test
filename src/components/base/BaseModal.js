import {
  StyleSheet, View, Modal,
} from 'react-native'

/*
 * Styling 邏輯
 * 最外層將 Modal 置於中央, 內層 centeredView 將內容也置中
 * Modal 本身 transparent + 內層的 modalView => 組成浮動視窗的樣式
*/
export default function BaseModal(props) {
  const { children, showModal } = props

  return (
    <View style={styles.centeredView}>
      <Modal visible={showModal} animationType='slide' transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonContainer: {
    flexDirection: 'row',
  },
})
