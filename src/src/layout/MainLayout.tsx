// src/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { ChatHeader } from '@/components/ChatHeader';

export default function MainLayout() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <ChatHeader />
                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
