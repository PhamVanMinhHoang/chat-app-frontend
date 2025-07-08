import React from "react";
import { useAppDispatch} from "../hooks";
import { logout } from '../store/slices/authSlice';
import { useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">My App</h1>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">
                Logout
            </button>
        </header>
    );
};
