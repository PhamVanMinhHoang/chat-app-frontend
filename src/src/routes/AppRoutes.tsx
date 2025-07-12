import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import AuthLayout from '@/layout/AuthLayout'
import MainLayout from '@/layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => (
    <Routes>
        {/* Public routes under AuthLayout */}
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes under MainLayout */}
        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

)

export default AppRoutes
