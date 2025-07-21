import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'  // hooks để dùng dispatch, selector
import { fetchConversations } from '@/features/chat/conversationSlice'
import { fetchMessages } from '@/features/chat/messageSlice'
import { setConversationId } from '@/features/chat/messageSlice'

export const ConversationList: React.FC<{ onSelect?: () => void }> = ({ onSelect }) => {
    const dispatch = useAppDispatch()
    const { items: conversations, loading } = useAppSelector(state => state.conversations);

    // Lấy danh sách cuộc trò chuyện khi component mount
    useEffect(() => {
        // Khi component mount, tải danh sách cuộc trò chuyện
        dispatch(fetchConversations());
    }, [dispatch]);

    if (loading) {
        return <div>Đang tải danh sách cuộc trò chuyện...</div>;
    }

    // Xử lý khi chọn một cuộc trò chuyện
    const handleSelectConversation = (id: number) => {
        dispatch(setConversationId(id))
        if (onSelect) onSelect()  // gọi callback nếu có
    }

    return (
        <div className="overflow-y-auto">
            {conversations.map(conv => {
                // Xác định tên hiển thị cho cuộc trò chuyện:
                let title = conv.name;
                if (!title || title.trim() === '') {
                    // Nếu không có tên (private chat), lấy tên người còn lại
                    const otherUsers = conv.users.map(u => u.name).join(', ');
                    title = otherUsers;
                }
                // Nội dung tin nhắn cuối (nếu có)
                const lastMsg = conv.lastMessage ? conv.lastMessage.content : '';
                return (
                    <div
                        key={conv.id}
                        className="p-3 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            // Chọn cuộc trò chuyện và tải tin nhắn
                            dispatch(setConversationId(conv.id));
                            dispatch(fetchMessages(conv.id));
                            onSelect && onSelect();  // gọi callback nếu cần (ví dụ đóng sidebar trên mobile)
                        }}
                    >
                        <p className="font-semibold">{title}</p>
                        <p className="text-sm text-gray-600">{lastMsg ? lastMsg : <i>(Chưa có tin nhắn)</i>}</p>
                    </div>
                )
            })}
        </div>
    );
}

