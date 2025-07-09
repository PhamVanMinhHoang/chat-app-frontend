import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { logout, selectAuth } from '../store/slices/auth/authSlice'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(selectAuth)

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between">
            <h1 className="text-xl">Chat App</h1>
            {token && (
                <button onClick={() => dispatch(logout())} className="underline">
                    Logout
                </button>
            )}
        </header>
    )
}

export default Header