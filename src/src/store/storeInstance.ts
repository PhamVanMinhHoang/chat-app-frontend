// store/storeInstance.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { setupInterceptors } from '../api/axios'

const store = configureStore({
    reducer: { auth: authReducer },
})

// Thiết lập axios interceptor sau khi store đã sẵn sàng
setupInterceptors(store)

export default store