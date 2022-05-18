import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTarget: '', // 開啟的 Modal 目標為何
  modalParams: {}
}

const store = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveTarget: (state, action) => {
      state.activeTarget = action.payload
    },
    clearActiveTarget: (state, action) => {
      state.activeTarget = ''
    },
    setModalParams: (state, action) => {
      state.modalParams = action.payload
    },
  },
})

export const { setActiveTarget, clearActiveTarget, setModalParams } = store.actions
export default store.reducer
