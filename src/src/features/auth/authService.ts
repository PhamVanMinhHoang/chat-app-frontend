import { client } from '@/api/client'

export interface Credentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    email: string
    password: string
    name: string
    password_confirmation: string
}

export const loginApi = (creds: Credentials) =>
    client.post<{ token: string; refreshToken: string }>('/auth/login', creds)

export const registerApi = (creds: RegisterCredentials) =>
    client.post<{ token: string; refreshToken: string }>('/auth/register', creds)
