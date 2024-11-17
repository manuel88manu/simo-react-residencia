import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { viewsSlice } from './views/viewSlice'

export const store = configureStore({
    reducer: {
        auth:authSlice.reducer,
        views:viewsSlice.reducer

    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
  })