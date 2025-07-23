import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/types'
import { loginApi, registerApi, Credentials, RegisterCredentials } from './authService'

interface AuthState {
    token: string | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
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
        console.log('res', res);
        return res.data
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message)
    }
})

export const register = createAsyncThunk<
    { token: string; refreshToken: string },
    RegisterCredentials,
    { rejectValue: string }
>('auth/register', async (creds, { rejectWithValue }) => {
    try {
        const res = await registerApi(creds)
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
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (s) => { s.loading = true; s.error = null })
            .addCase(login.fulfilled, (s, a: PayloadAction<{ token: string; refreshToken: string }>) => {
                s.loading = false
                s.token = a.payload.token
                localStorage.setItem('token', a.payload.token)
            })
            .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message! })

            .addCase(register.pending, (s) => { s.loading = true; s.error = null })
            .addCase(register.fulfilled, (s, a) => {
                s.loading = false
            })
            .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message! })
    },
})


// ----- Selectors
export const selectAuth = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token)

// ----- Exports -----
export const { logout } = authSlice.actions
export default authSlice.reducer