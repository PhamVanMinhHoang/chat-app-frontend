import React, {JSX, ReactNode} from 'react'
import { Outlet } from 'react-router-dom'

interface AuthLayoutProps {
    children?: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
                {/* Nếu có children truyền vào trực tiếp thì ưu tiên, nếu không thì dùng Outlet */}
                {children ?? <Outlet />}
            </div>
        </div>
    )
}

