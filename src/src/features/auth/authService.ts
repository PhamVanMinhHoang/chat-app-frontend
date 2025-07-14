import { client } from '@/api/client'

export interface Credentials {
    email: string
    password: string
    grant_type?: string
    client_id?: string
    client_secret?: string
    scope?: string
}

export interface RegisterCredentials {
    email: string
    password: string
    name: string
    password_confirmation: string
}

export const loginApi = (creds: Credentials) =>
    client.post<{ token: string; refreshToken: string }>('oauth/token', creds)

export const registerApi = (creds: RegisterCredentials) =>
    client.post<{ token: string; refreshToken: string }>('api/v1/auth/register', creds)

export const refreshTokenApi = (refreshToken: string) =>
    client.post<{ token: string }>('/auth/refresh', { token: refreshToken })