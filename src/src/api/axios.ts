import axios from 'axios'
import { store } from '../store/store'
import { logout, refreshAuthToken } from '../store/slices/auth/authSlice'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: attach token
instance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token
        if (token) config.headers!['Authorization'] = `Bearer ${token}`
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor: handle 401 -> refresh
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true
            try {
                await store.dispatch(refreshAuthToken())
                const token = store.getState().auth.token
                if (token) original.headers['Authorization'] = `Bearer ${token}`
                return instance(original)
            } catch {
                store.dispatch(logout())
            }
        }
        return Promise.reject(error)
    }
)

export default instance