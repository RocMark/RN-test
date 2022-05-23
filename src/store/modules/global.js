import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // 是否顯示 LoadingOverlay
  isFetching: false,
  // API 回傳錯誤訊息
  errorMessage: ''
}

const store = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsFetching: (state, action) => {
      state.isFetching = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    clearErrorMessage: (state, action) => {
      state.errorMessage = ''
    },
  },
})

export const { setIsFetching, setErrorMessage, clearErrorMessage } = store.actions
export default store.reducer
