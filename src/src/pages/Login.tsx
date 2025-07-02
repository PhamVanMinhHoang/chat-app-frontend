import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../store/slices/authSlice';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useAppDispatch();
    const { token, loading, error } = useAppSelector((s) => s.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (token) return <Navigate to="/" />;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            {error && <div className="text-red-500">{error}</div>}
            <input type="email" placeholder="Email" value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full p-2 border rounded" required />
            <button type="submit" disabled={loading}
                    className="w-full py-2 bg-indigo-600 text-white rounded">
                {loading ? 'Loading...' : 'Login'}
            </button>
            <p className="text-center">
                Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link>
            </p>
        </form>
    );
};
export default Login;