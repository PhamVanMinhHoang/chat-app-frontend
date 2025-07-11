import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import { selectIsAuthenticated } from '@/features/auth'

const ProtectedRoute = () => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute