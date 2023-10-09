import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'

export const store = configureStore({
  reducer: {user: userReducer },
  //para evitar erro no borwser
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})