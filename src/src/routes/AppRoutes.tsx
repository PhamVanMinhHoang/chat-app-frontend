import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../layout/AuthLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AppRoutes = () => {
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
export default AppRoutes;