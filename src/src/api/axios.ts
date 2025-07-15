import { client } from './client'
import { store } from '@/app/store'

client.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token
        if (token) {
            config.headers = config.headers ?? {}
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)