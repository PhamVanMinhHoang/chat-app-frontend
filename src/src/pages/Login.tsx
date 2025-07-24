import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { login } from '@/features/auth'
import AuthLayout from '@/layout/AuthLayout'

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((s) => s.auth)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await dispatch(login({ email, password })).unwrap()
        if (result.token) navigate('/')
    }

    return (
        <AuthLayout>
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </AuthLayout>
    )
}

export default Login
