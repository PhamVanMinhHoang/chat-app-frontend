import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../layout/AuthLayout';
import { useAppSelector } from '../hooks';
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    const token = useAppSelector(state => state.auth.token);

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />

            {/* Add your protected routes here */}
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<div>Welcome to the Dashboard!</div>} />
                {/* Add more protected routes as needed */}
            </Route>

            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
    );
};
export default AppRoutes;