import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

const store = createSlice({
  name: 'example',
  initialState,
  reducers: {
    addExample: (state, action) => {
      const { id } = action.payload
      state.ids = [...state.ids, id]
    },
  },
})

export const { addExample } = store.actions
export default store.reducer
