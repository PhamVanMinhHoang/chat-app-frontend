import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
            <Outlet />
        </div>
    </div>
);
export default AuthLayout;