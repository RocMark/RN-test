import uuid from 'react-native-uuid'

export default class Controller {
  // 用 index 將資料加上 id 作為 key
  static addIdToDataUsingUuid(data) {
    // map return 物件需要用 () 包裹
    return data.map((el, index) => {
      if (el.id) return el
      return ({ value: el, id: uuid.v4() })
    })
  }

  // 取得 uuid
  static getUuid() {
    return uuid.v4()
  }
}
