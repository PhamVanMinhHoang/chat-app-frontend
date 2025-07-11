import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/types'
import { loginApi, registerApi, refreshTokenApi, Credentials } from './authService'

interface AuthState {
    token: string | null
    refreshToken: string | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    loading: false,
    error: null,
}

export const login = createAsyncThunk<
    { token: string; refreshToken: string },
    Credentials,
    { rejectValue: string }
>('auth/login', async (creds, { rejectWithValue }) => {
    try {
        const res = await loginApi(creds)
        return res.data
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message)
    }
})

export const register = createAsyncThunk<
    { token: string; refreshToken: string },
    Credentials,
    { rejectValue: string }
>('auth/register', async (creds, { rejectWithValue }) => {
    try {
        const res = await registerApi(creds)
        return res.data
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message)
    }
})

export const refreshAuthToken = createAsyncThunk<
    { token: string },
    void,
    { state: RootState; rejectValue: string }
>('auth/refresh', async (_, { getState, rejectWithValue }) => {
    const rt = (getState() as RootState).auth.refreshToken
    if (!rt) return rejectWithValue('No refresh token')
    try {
        const res = await refreshTokenApi(rt)
        return res.data
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null
            state.refreshToken = null
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (s) => { s.loading = true; s.error = null })
            .addCase(login.fulfilled, (s, a: PayloadAction<{ token: string; refreshToken: string }>) => {
                s.loading = false
                s.token = a.payload.token
                s.refreshToken = a.payload.refreshToken
                localStorage.setItem('token', a.payload.token)
                localStorage.setItem('refreshToken', a.payload.refreshToken)
            })
            .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message! })

            .addCase(register.pending, (s) => { s.loading = true; s.error = null })
            .addCase(register.fulfilled, (s, a) => {
                s.loading = false
                s.token = a.payload.token
                s.refreshToken = a.payload.refreshToken
                localStorage.setItem('token', a.payload.token)
                localStorage.setItem('refreshToken', a.payload.refreshToken)
            })
            .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message! })

            .addCase(refreshAuthToken.fulfilled, (s, a) => {
                s.token = a.payload.token
                localStorage.setItem('token', a.payload.token)
            })
            .addCase(refreshAuthToken.rejected, (s) => {
                s.token = null
                s.refreshToken = null
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer