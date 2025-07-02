import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // Adjust the import path as necessary

type AuthState = {
    token: string | null;
    loading: boolean;
    error: string | null
};
const initialState: AuthState = {
    token: localStorage.getItem('token'),
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        const res = await axios.post('/login', credentials);
        return res.data.access_token;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string }, thunkAPI) => {
        const res = await axios.post('/register', userData);
        return res.data.access_token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;