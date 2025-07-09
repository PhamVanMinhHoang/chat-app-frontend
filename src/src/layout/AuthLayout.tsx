import React from 'react'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthLayout