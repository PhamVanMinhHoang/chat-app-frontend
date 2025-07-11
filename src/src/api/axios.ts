import { client } from './client'
import { store } from '@/app/store'
import { refreshAuthToken, logout } from '@/features/auth'

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

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        if (
            error.response?.status === 401 &&
            !original._retry
        ) {
            original._retry = true
            try {
                const result = await store.dispatch(refreshAuthToken()).unwrap()
                if (result?.token) {
                    original.headers = {
                        ...original.headers,
                        Authorization: `Bearer ${result.token}`,
                    }
                    return client(original)
                }
            } catch {
                store.dispatch(logout())
            }
        }
        return Promise.reject(error)
    }
)

export default client