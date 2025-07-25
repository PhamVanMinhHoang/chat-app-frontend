// src/components/ChatHeader.tsx
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { LogOut, Info } from 'lucide-react';
import { logout } from '@/features/auth';
import {ThemeSwitcher} from "@/components/ThemeSwitcher";

export const ChatHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);

    const currentConv = useAppSelector((state) => {
        const convId = state.messages.conversationId;
        return state.conversations.items.find((c) => c.id === convId);
    });

    const title =
        currentConv?.name ||
        currentConv?.users
            ?.filter((u) => !u.is_current_user)
            .map((u) => u.name)
            .join(', ') ||
        'Cuộc trò chuyện';

    return (
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            {/* Tên cuộc trò chuyện */}
            <h2 className="text-xl font-semibold truncate text-gray-800 dark:text-white">
                {title}
            </h2>

            {/* Các nút chức năng */}
            <div className="flex items-center gap-2">
                {/* Nút đổi giao diện */}
                <ThemeSwitcher />

                {/* Nút tạo cuộc trò chuyện mới */}
                <button
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    title="Chi tiết cuộc trò chuyện"
                >
                    <Info className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {token && (
                <button
                    onClick={() => dispatch(logout())}
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-600 dark:bg-gray-700 dark:hover:bg-red-600 text-gray-700 hover:text-white transition"
                    title="Đăng xuất"
                >
                    <LogOut className="w-5 h-5" />
                </button>
                )}
            </div>
        </header>
    );
};
