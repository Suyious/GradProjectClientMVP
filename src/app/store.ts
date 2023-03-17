import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { rootApi } from './services/api' 

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch