import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // ✅ KHÔNG import store ở đây

type AuthState = {
    token: string | null;
    refreshToken?: string | null; // Optional, if you want to handle refresh tokens
    loading: boolean;
    error: string | null
};
const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken') || null, // Optional, if you want to handle refresh tokens
    loading: false,
    error: null
};

// Login Thunk
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        const res = await axios.post('/login', credentials);
        return {
            token: res.data.access_token,
            refresh_token: res.data.refresh_token // Optional, if you want to handle refresh tokens
        }
    }
);

// Register Thunk
export const register = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string }, thunkAPI) => {
        const res = await axios.post('/register', userData);
        return {
            token: res.data.access_token,
            refresh_token: res.data.refresh_token // Optional, if you want to handle refresh tokens
        }
    }
);

// Refresh Token Thunk (optional)
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as { auth: AuthState };
        if (!state.auth.refreshToken) {
            return thunkAPI.rejectWithValue('No refresh token available');
        }
        const response = await axios.post('/refresh', {
            refresh_token: state.auth.refreshToken
        });
        return {
            token: response.data.access_token,
            refresh_token: response.data.refresh_token // Optional, if you want to handle refresh tokens
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.refreshToken = null; // Optional, if you want to handle refresh tokens
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken'); // Optional, if you want to handle refresh tokens
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle login actions
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                // Optional: handle refresh token
                state.refreshToken = action.payload.refresh_token;
                localStorage.setItem('refreshToken', action.payload.refresh_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            // Register case
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                // Optional: handle refresh token
                state.refreshToken = action.payload.refresh_token;
                localStorage.setItem('refreshToken', action.payload.refresh_token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                // Optional: handle refresh token
                state.refreshToken = action.payload.refresh_token;
                localStorage.setItem('refreshToken', action.payload.refresh_token);
            })

    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;