import axios from 'axios'

/*
import Api from 'Api'
Api.get('/me/')
  .then(response => {})
  .catch(error => {})
*/

export default class Api {
  static getRequest() {
    const baseURL = 'https://rn2022-test-default-rtdb.asia-southeast1.firebasedatabase.app/'
    const csrfToken = ''
    const token = ''

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
    request.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    )
    request.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error
        const statusCode = response.status
        const { errorMessage } = response.data
        return Promise.reject(error)
      }
    )
  }

  static get(uri, params = {}) {
    const request = Api.getRequest()
    return request.get(uri, { params })
  }

  static post(uri, params = {}) {
    const request = Api.getRequest()
    return request.post(uri, params)
  }

  static put(uri, params = {}) {
    const request = Api.getRequest()
    return request.put(uri, params)
  }

  static delete(uri, params = {}) {
    const request = Api.getRequest()
    return request.delete(uri, params)
  }

  // 測試用
  static postTestData(params) {
    return Api.post('/test.json', { test: 123 })
  }

  // 測試用
  static getTestData(params) {
    return Api.get('/test.json')
  }
}
