import axios from 'axios'

// Redux
import store from '../store/store'

import {
  setIsFetching, setErrorMessage
} from '../store/modules/global'

import {
  logout
} from '../store/modules/login'

// TODO 可能有些 API 不需要 Loading 要看一下怎麼傳參數
export default class Api {

  static request() {
    return Api.getRequest()
  }

  static getRequest() {
    const baseURL = 'https://rn2022-test-default-rtdb.asia-southeast1.firebasedatabase.app/'

    const state = store.getState()
    const { token } = state.login

    const request = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
    })

    Api._mountInterceptor(request)
    return request
  }

  // 設置攔截器, 統一處理回傳結果 Ex: ErrorMessage
  static _mountInterceptor(request) {
    request.interceptors.request.use(
      (config) => {
        store.dispatch(setIsFetching(true))
        return config
      },
      (error) => Promise.reject(error)
    )

    request.interceptors.response.use(
      (response) => {
        setTimeout(() => {
          store.dispatch(setIsFetching(false))
        }, 5000)
        return response
      },
      (error) => {
        const { response } = error

        // TODO 將受到 Login Token 過期進行登出
        const isLoginTokenExpired = false
        if (isLoginTokenExpired) store.dispatch(logout())

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
  static test(params) {
    return Api.get('/test.json')
  }

  // 登入: 要將 token 寫入 redux
  static login(params) {
  }

  // 第三方註冊成功會自動回傳 token: 要將 token 寫入 redux
  static register(params) {
  }

  // 登出: 要將 redux 中的 token 清除
  static logout(params) {
  }

  // 傳送 Push Notification 用的 Device token 至後端
  static storeDeviceToken(params) {
    const { deviceToken, uid } = params
    return Api.post('/push-notification-token', params)
  }
}
