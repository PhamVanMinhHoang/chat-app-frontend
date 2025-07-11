import { client } from '@/api/client'

export interface Credentials {
    email: string
    password: string
}

export const loginApi = (creds: Credentials) =>
    client.post<{ token: string; refreshToken: string }>('/auth/login', creds)

export const registerApi = (creds: Credentials) =>
    client.post<{ token: string; refreshToken: string }>('/auth/register', creds)

export const refreshTokenApi = (refreshToken: string) =>
    client.post<{ token: string }>('/auth/refresh', { token: refreshToken })