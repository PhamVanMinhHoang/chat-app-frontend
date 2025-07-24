import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { logout } from '@/features/auth'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((s) => s.auth)

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between shadow-md">
            <h1 className="text-xl font-semibold">Chat App</h1>
            {token && (
                <button onClick={() => dispatch(logout())} className="underline">
                    Logout
                </button>
            )}
        </header>
    )
}

export default Header
