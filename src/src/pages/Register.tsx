import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { register } from '../store/slices/authSlice';
import { Navigate, Link } from 'react-router-dom';

const Register = () => {
    const dispatch = useAppDispatch();
    const { token, loading, error } = useAppSelector((s) => s.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (token) return <Navigate to="/" />;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Register</h2>
            {error && <div className="text-red-500">{error}</div>}
            <input type="text" placeholder="Name" value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full p-2 border rounded" required />
            <input type="email" placeholder="Email" value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full p-2 border rounded" required />
            <button type="submit" disabled={loading}
                    className="w-full py-2 bg-indigo-600 text-white rounded">
                {loading ? 'Loading...' : 'Register'}
            </button>
            <p className="text-center">
                Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
            </p>
        </form>
    );
}

export default Register;