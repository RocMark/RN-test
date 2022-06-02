import { configureStore } from '@reduxjs/toolkit'

// Redux Persist
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

// modules
import exampleReducer from './modules/example'
import globalReducer from './modules/global'
import modalReducer from './modules/modal'
import loginReducer from './modules/login'

/*
 * Redux 資料：Loading  | Login | Error
 * Redux Thunk 已自動安裝 https://github.com/reduxjs/redux-thunk#composition
 * Redux Persist
*/

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks']
}

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
