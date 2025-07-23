import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'  // hooks để dùng dispatch, selector
import { fetchConversations } from '@/features/chat/conversationSlice'
import { setConversationId, fetchMessages, addMessage } from '@/features/chat/messageSlice'
import { initEcho, getEcho } from '@/api/socket'

export const ConversationList: React.FC<{ onSelect?: () => void }> = ({ onSelect }) => {
    const dispatch = useAppDispatch()
    const conversations = useAppSelector(state => state.conversations.items)
    const loading = useAppSelector(state => state.conversations.loading)
    const currentConvId = useAppSelector(state => state.messages.conversationId)
    const token = useAppSelector(state => state.auth.token)

    // Lấy danh sách cuộc trò chuyện khi component mount
    useEffect(() => {
        // Khi component mount, tải danh sách cuộc trò chuyện
        dispatch(fetchConversations());
    }, [dispatch]);

    // Khởi tạo kết nối Echo khi có token đăng nhập
    useEffect(() => {
        if (token) {
            initEcho(token)
        }
    }, [token]);

    if (loading) {
        return <div>Đang tải danh sách cuộc trò chuyện...</div>;
    }

    return (
        <div className="overflow-y-auto">
            {conversations.map(conv => {
                // Xác định tên hiển thị cho cuộc trò chuyện
                let title = conv.name
                // Nếu cuộc trò chuyện có người dùng, lấy tên người dùng đầu tiên
                if (conv.users.length > 0) {
                    title = conv.users[0].name || `User ${conv.users[0].id}`;
                }

                return (
                    <div
                        key={conv.id}
                        className="p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            // Nếu đang có cuộc trò chuyện khác mở, rời khỏi kênh cũ trước khi join kênh mới
                            const echo = getEcho()
                            if (currentConvId && echo) {
                                echo.leave(`conversation.${currentConvId}`)
                            }
                            // Cập nhật cuộc trò chuyện đang chọn trong Redux
                            dispatch(setConversationId(conv.id))
                            // Lấy tin nhắn của cuộc trò chuyện này từ API
                            dispatch(fetchMessages(conv.id))
                            // Tham gia vào kênh realtime của conversation hiện tại
                            if (echo) {
                                console.log(`Tham gia kênh realtime cho cuộc trò chuyện ${conv.id}`)
                                echo.private(`conversation.${conv.id}`)
                                    .listen('MessageSent', (e: any) => {
                                        // Khi nhận được sự kiện MessageSent (có tin nhắn mới)
                                        const newMessage = e.message  // backend gửi { message: {..} }
                                        console.log(`Nhận tin nhắn mới: ${newMessage.content} từ cuộc trò chuyện ${conv.id}`)
                                        dispatch(addMessage(newMessage))
                                    })
                            }
                        }}
                    >
                        <p className="font-semibold">{title}</p>
                        {/* Hiển thị ví dụ tin nhắn gần nhất (nếu có) */}
                        <p className="text-gray-600 text-sm">{conv.last_message?.content || ''}</p>
                    </div>
                )
            })}

        </div>
    );
}

