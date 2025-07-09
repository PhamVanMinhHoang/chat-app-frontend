import axios from '../../../api/axios'

export interface Credentials {
    email: string
    password: string
}

export const loginApi = (creds: Credentials) => axios.post('/auth/login', creds)
export const registerApi = (creds: Credentials) => axios.post('/auth/register', creds)
export const refreshTokenApi = (refreshToken: string) =>
    axios.post('/auth/refresh', { token: refreshToken })