import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const ProtectedRoute: React.FC = () => {
    const token = useAppSelector((state) => state.auth.token);

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;