import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Adjust the import path as necessary

const store = configureStore(
    {
        reducer: {
            auth: authReducer,
        },

    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;