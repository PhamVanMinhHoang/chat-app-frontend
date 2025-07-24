import { client } from '@/api/client'

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

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
    client.post<{ token: string; user: User }>('/auth/login', creds)

export const registerApi = (creds: RegisterCredentials) =>
    client.post<{ token: string; user: User }>('/auth/register', creds)
