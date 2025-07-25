// src/layout/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full flex">
            {/* Cột trái */}
            <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                <div className="text-center px-6">
                    <h1 className="text-4xl font-bold mb-4">Chat App</h1>
                    <p className="text-lg">Kết nối nhanh chóng, đơn giản, hiện đại.</p>
                </div>
            </div>

            {/* Cột phải */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <Outlet /> {/* hoặc {children} */}
                </div>
            </div>
        </div>
    );
}

