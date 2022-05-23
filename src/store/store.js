import { configureStore } from '@reduxjs/toolkit'

// modules
import exampleReducer from './modules/example'
import globalReducer from './modules/global'
import modalReducer from './modules/modal'
import loginReducer from './modules/login'

/*
 * Redux 資料：Loading  | Login | Error
 * Redux Persist
 * Redux Thunk
*/

const reducer = {
  global: globalReducer,
  example: exampleReducer,
  modal: modalReducer,
  login: loginReducer,
}

const preloadedState = {
}

const store = configureStore({
  preloadedState,
  reducer,
  // middleware: [],
  // devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [],
})

export default store
