import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { register } from '@/features/auth'

const Register: React.FC = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((s) => s.auth)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await dispatch(register({
                name, email, password, password_confirmation
            })).unwrap();
            if (result.success) {
                setSuccess(true)
                setTimeout(() => navigate('/login'), 3000) // Chuyển hướng sau 3 giây
            }
        } catch (err) {
            console.error('Đăng ký thất bại:', err)
            // Ví dụ: hiển thị thông báo lỗi cho người dùng
            if (err instanceof Error) {
                console.error('Lỗi:', err.message)
            } else {
                console.error('Lỗi không xác định:', err)
            }
        }
    }

    return (
        <>
            {success && (
                <div className="mb-4 text-green-600 text-sm text-center">
                    ✅ Đăng ký thành công! Vui lòng đăng nhập để tiếp tục...
                </div>
            )}

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

            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                Đã có tài khoản?{' '}
                <a
                    href="/login"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                    Đăng nhập
                </a>
            </p>

        </>
    )
}

export default Register
