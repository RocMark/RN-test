import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}

const store = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExampleData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setExampleData } = store.actions
export default store.reducer
