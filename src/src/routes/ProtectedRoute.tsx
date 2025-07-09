import React, {JSX} from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { selectIsAuthenticated } from '../store/slices/auth/authSlice'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    return isAuth ? children : <Navigate to="/login" />
}

export default ProtectedRoute