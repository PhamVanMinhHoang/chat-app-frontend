// src/components/MessageList.tsx
import { useAppSelector } from '@/hooks/redux'

export const MessageList: React.FC = () => {
    const { conversationId, items: messages, loading, error } = useAppSelector(state => state.messages);

    if (!conversationId) {
        return <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Hãy chọn một cuộc trò chuyện để xem tin nhắn</p>
        </div>;
    }

    if (loading) {
        return <div>Đang tải tin nhắn...</div>;
    }
    if (error) {
        return <div className="text-red-500">Lỗi: {error}</div>;
    }
    return (
        <div className="flex flex-col p-4 space-y-2 max-h-full overflow-y-auto">
            {messages.map(msg => (
                <div key={msg.id} className="flex flex-col bg-gray-100 rounded px-3 py-2">
                    <span className="text-sm font-semibold text-gray-800">
                        {msg.sender.name ? msg.sender.name : `User ${msg.sender.id}`}
                    </span>
                    <span className="text-gray-700">{msg.content}</span>
                    <span className="text-xs text-gray-500 self-end">
                        {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                </div>
            ))}
        </div>
    );
};
