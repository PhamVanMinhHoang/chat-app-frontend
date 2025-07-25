// src/components/Sidebar.tsx
import { ConversationList } from './ConversationList';
import { useAppSelector } from '@/hooks/redux';
import {LogOut, Plus} from 'lucide-react';
import {ThemeSwitcher} from "@/components/ThemeSwitcher";

export const Sidebar: React.FC = () => {
    const currentUser = useAppSelector((state) => state.auth.user);

    return (
        <aside className="flex flex-col bg-gray-800 text-gray-100 h-full w-64">
            {/* Tiêu đề ứng dụng */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h2 className="text-lg font-bold">Chat App</h2>
                <button
                    className="text-purple-400 hover:text-white p-1 rounded hover:bg-purple-600 transition"
                    title="Cuộc trò chuyện mới"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* Tìm kiếm cuộc trò chuyện */}
            <div className="px-4 py-2 border-b border-gray-700">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 text-sm px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Danh sách cuộc trò chuyện */}
            <div className="flex-1 overflow-y-auto">
                <ConversationList />
            </div>

            {/* Thông tin người dùng */}
            <div className="px-4 py-3 border-t border-gray-700 flex items-center gap-3">
                <img
                    src={currentUser?.avatar || '/default-avatar.png'}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 text-sm truncate">{currentUser?.name || 'Người dùng'}</div>
                <button className="text-gray-400 hover:text-white" title="Đăng xuất">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </aside>
    );
};
