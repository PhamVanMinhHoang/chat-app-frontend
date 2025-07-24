import { createSlice } from '@reduxjs/toolkit';

const getDefaultTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
        if (localStorage.theme) return localStorage.theme;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
};

// Tạo slice cho UI
const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        theme: getDefaultTheme(),
    },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.theme = action.payload;
                if (action.payload === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        },
        toggleTheme(state) {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            if (typeof window !== 'undefined') {
                localStorage.theme = state.theme;
                if (state.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        },
    },
});

export const { setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;