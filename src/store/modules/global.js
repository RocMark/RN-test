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
      const { isFetching } = action.payload
      state.isFetching = isFetching
      console.log('\x1b[36m%s\x1b[0m', '===setIsFetching===', state.isFetching)
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.errorMessage = errorMessage
    },
    clearErrorMessage: (state, action) => {
      state.errorMessage = ''
    },
  },
})

export const { setIsFetching, setErrorMessage, clearErrorMessage } = store.actions
export default store.reducer
