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
                <div key={msg.id} className="flex flex-col">
          <span className="text-sm text-gray-600">
            <b>{msg.sender.name}:</b> {/* Tên người gửi */}
              <span className="ml-2 text-gray-800">{msg.content}</span>  {/* Nội dung tin nhắn */}
          </span>
                    <span className="text-xs text-gray-500 self-end">
            { new Date(msg.created_at).toLocaleTimeString() }
          </span>
                </div>
            ))}
        </div>
    );
};
