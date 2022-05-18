import axios from 'axios'

// Redux
import store from '../store/store'

import {
  setIsFetching, setErrorMessage
} from '../store/modules/global'

export default class Api {

  static request() {
    return Api.getRequest()
  }

  static getRequest() {
    const baseURL = 'https://rn2022-test-default-rtdb.asia-southeast1.firebasedatabase.app/'
    const csrfToken = ''
    const token = ''

    console.log('\x1b[36m%s\x1b[0m', '===store.state===', store.state)

    const request = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        Authorization: `Token ${token}`
      },
    })

    Api._mountInterceptor(request)
    return request
  }

  // 設置攔截器, 統一處理回傳結果 Ex: ErrorMessage
  static _mountInterceptor(request) {

    console.log('\x1b[36m%s\x1b[0m', '===_mountInterceptor===')

    request.interceptors.request.use(
      (config) => {
        console.log('\x1b[36m%s\x1b[0m', '===requestUse===')
        store.dispatch(setIsFetching({ isFetching: true }))
        return config
      },
      (error) => Promise.reject(error)
    )

    request.interceptors.response.use(
      (response) => {
        console.log('\x1b[36m%s\x1b[0m', '===reponseUse===')
        setTimeout(() => {
          store.dispatch(setIsFetching({ isFetching: false }))
        }, 5000)
        return response
      },
      (error) => {
        const { response } = error
        const statusCode = response.status
        const { errorMessage } = response.data
        return Promise.reject(error)
      }
    )
  }

  static get(uri, params = {}) {
    const request = Api.request()
    return request.get(uri, { params })
  }

  static post(uri, params = {}) {
    const request = Api.request()
    return request.post(uri, params)
  }

  static put(uri, params = {}) {
    const request = Api.request()
    return request.put(uri, params)
  }

  static delete(uri, params = {}) {
    const request = Api.request()
    return request.delete(uri, params)
  }

  // 測試用
  static postTestData(params) {
    return Api.post('/test.json', { test: 123 })
  }

  // 測試用
  static getTestData(params) {

    console.log('\x1b[36m%s\x1b[0m', '===getTestData===')

    return Api.get('/test.json')
  }
}
