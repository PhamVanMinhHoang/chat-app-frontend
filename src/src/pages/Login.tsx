// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { login } from '@/features/auth';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await dispatch(login({ email, password })).unwrap();
            if (result?.token) navigate('/');
        } catch (err) {
            console.error('Đăng nhập thất bại:', err);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
                Đăng nhập
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded transition disabled:opacity-50"
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                    Chưa có tài khoản?{' '}
                    <a
                        href="/register"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                        Đăng ký
                    </a>
                </p>
            </form>
        </>
    );
};

export default Login;
