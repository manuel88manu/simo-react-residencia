import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { viewsSlice } from './views/viewSlice'
import { periodoSlice } from './periody/periodoSlice'
import { obraSlice } from './obra/obraSlice'
import { expediSlice } from './expediente/expediSlice'

export const store = configureStore({
    reducer: {
        auth:authSlice.reducer,
        views:viewsSlice.reducer,
        periodo:periodoSlice.reducer,
        obra:obraSlice.reducer,
        expedi:expediSlice.reducer

    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
  })