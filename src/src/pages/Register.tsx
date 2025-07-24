import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { register } from '@/features/auth'
import AuthLayout from '@/layout/AuthLayout'

const Register: React.FC = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((s) => s.auth)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await dispatch(register({name, email, password, password_confirmation })).unwrap()
        if (result.token) navigate('/')
    }

    return (
        <AuthLayout>
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                />

                {/* Email */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                />

                {/* Password */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                />

                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </AuthLayout>
    )
}

export default Register
