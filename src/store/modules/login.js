import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  isUserLogin: false
}

// 登入成功後, 儲存 token 至 Redux
const store = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setIsUserLogin: (state, action) => {
      state.isUserLogin = action.payload
    },
    clearToken: (state, action) => {
      state.token = ''
    },
  },
})

export const { setToken, clearToken } = store.actions
export default store.reducer
