import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/types'
import { loginApi, registerApi, Credentials, RegisterCredentials } from './authService'

interface User {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
}

interface AuthState {
    token: string | null
    user: User | null
    loading: boolean
    error: string | null
    success: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,  // Lưu thông tin người dùng nếu có
    loading: false,
    error: null,
    success: null,
}

export const login = createAsyncThunk<
    { token: string; user: User },
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
    { success: string; user: User },
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
            state.user = null;
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (s) => { s.loading = true; s.error = null })
            .addCase(login.fulfilled, (s, a: PayloadAction<{ token: string; user: User }>) => {
                s.loading = false;
                s.token = a.payload.token;
                s.user = a.payload.user;
                localStorage.setItem('token', a.payload.token);
                localStorage.setItem('user', JSON.stringify(a.payload.user));
            })
            .addCase(login.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload || a.error.message!
            })

            .addCase(register.pending, (s) => {
                s.loading = true;
                s.error = null
            })
            .addCase(register.fulfilled, (s, a) => {
                s.loading = false
                s.success = a.payload.success;
            })
            .addCase(register.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload || a.error.message!
            })
    },
})


// ----- Selectors
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token)

// ----- Exports -----
export const { logout } = authSlice.actions
export default authSlice.reducer