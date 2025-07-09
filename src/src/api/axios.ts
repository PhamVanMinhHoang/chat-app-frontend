// api/axios.ts
import axios from 'axios'
import type { Store } from '@reduxjs/toolkit'
import { refreshToken, logout } from '../store/slices/authSlice'
import type { AppDispatch } from '../store/types';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: { 'Content-Type': 'application/json' }
})

export function setupInterceptors(store: Store) {
    let isRefreshing = false
    let failedQueue: Array<{
        resolve: (token?: string) => void
        reject: (err?: any) => void
    }> = []

    const processQueue = (error: any, token: string | null = null) => {
        failedQueue.forEach(p => {
            if (error) p.reject(error)
            else p.resolve(token ?? '')
        })
        failedQueue = []
    }

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    })

    instance.interceptors.response.use(
        res => res,
        async error => {
            const originalRequest = error.config
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    }).then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`
                        return instance(originalRequest)
                    })
                }

                originalRequest._retry = true
                isRefreshing = true

                return new Promise(async (resolve, reject) => {
                    try {
                        const dispatch = store.dispatch as AppDispatch;
                        const action = await dispatch(refreshToken());
                        const newToken = (action.payload as any).token;
                        instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                        processQueue(null, newToken)
                        resolve(instance(originalRequest))
                    } catch (err) {
                        processQueue(err, null)
                        store.dispatch(logout())
                        reject(err)
                    } finally {
                        isRefreshing = false
                    }
                })
            }

            return Promise.reject(error)
        }
    )
}

export default instance