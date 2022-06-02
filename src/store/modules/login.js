import { createSlice } from '@reduxjs/toolkit'

const UID_GUEST = 'GUEST'
const initialState = {
  token: '',
  uid: UID_GUEST,
  isTokenExpired: false,
}

export function checkIsUserLogin(uid) {
  return uid !== UID_GUEST
}

// 登入成功後, 儲存 token 至 Redux
const store = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    clearToken: (state, action) => {
      state.token = ''
    },
    setUid: (state, action) => {
      state.uid = action.payload
    },
    setTokenExpired: (state, action) => {
      state.isTokenExpired = action.payload
    },
    // 登入
    login: (state, action) => {
      const { token, uid } = action.payload
      state.uid = uid
      state.isTokenExpired = false // Router.js 判斷此參數進行跳轉至登入頁面
      state.token = token
    },
    // login token 失效 or 登出
    logout: (state, action) => {
      const { token, uid } = action.payload
      state.uid = UID_GUEST
      state.isTokenExpired = true // Router.js 判斷此參數進行跳轉至登入頁面
      state.token = ''
    },
  },
})

export const {
  setToken, clearToken, setUid, setIsTokenExpired, login, logout
} = store.actions
export default store.reducer
