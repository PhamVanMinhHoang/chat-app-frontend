import axios from 'axios';
import { refreshToken, logout } from '../store/slices/authSlice';
import store from '../store';

// This file sets up an Axios instance with a base URL and request interceptors for authentication.
const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: { 'Content-Type': 'application/json' }
});

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

// Function to process the queue of failed requests
const processQueue = (error: any, token: string | null = null): void => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle token expiration
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    // @ts-ignore
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;
            return new Promise(async (resolve, reject) => {
                try {
                    const action = await store.dispatch(refreshToken());
                    const newToken = (action.payload as any).token;
                    instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    resolve(instance(originalRequest));
                } catch (err) {
                    processQueue(err, null);
                    store.dispatch(logout());
                    reject(err);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return Promise.reject(error);
    }
);
export default instance;