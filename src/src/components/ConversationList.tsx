import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchConversations } from '@/features/chat/conversationSlice'
import { setConversationId, fetchMessages, addMessage } from '@/features/chat/messageSlice'
import { initEcho, getEcho } from '@/api/socket'
import { Avatar } from './Avatar'

export const ConversationList: React.FC<{ onSelect?: () => void }> = ({ onSelect }) => {
    const dispatch = useAppDispatch()
    const conversations = useAppSelector(state => state.conversations.items)
    const loading = useAppSelector(state => state.conversations.loading)
    const currentConvId = useAppSelector(state => state.messages.conversationId)
    const token = useAppSelector(state => state.auth.token)

    useEffect(() => {
        dispatch(fetchConversations());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            initEcho(token)
        }
    }, [token]);

    if (loading) {
        return <div className="p-6 text-gray-500 text-center">Đang tải danh sách cuộc trò chuyện...</div>;
    }

    return (
        <div className="overflow-y-auto h-full px-2 py-2 bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800">
            {conversations.length === 0 && (
                <div className="text-center py-4 text-gray-400 italic">Chưa có cuộc trò chuyện nào.</div>
            )}
            {conversations.map(conv => {
                // Lấy avatar: nếu là nhóm thì conv.avatar, nếu chat riêng thì lấy avatar của người còn lại
                let avatar = conv.avatar ? conv.avatar : '/default-avatar.png';
                let title = conv.name ? conv.name : 'Cuộc trò chuyện';
                if ((!avatar || avatar === '') && conv.users?.length > 0) {
                    const otherUser = conv.users.find(u => !u.is_current_user);
                    avatar = otherUser?.avatar || '/default-avatar.png';
                    title = otherUser?.name || conv.users[0].name || `User ${conv.users[0].id}`;
                }

                const lastMsg = conv.last_message?.content || 'Chưa có tin nhắn nào';

                const isActive = currentConvId === conv.id;

                return (
                    <div
                        key={conv.id}
                        className={`
                            flex items-center gap-3 p-3 mb-1 cursor-pointer rounded-xl transition
                            ${isActive
                            ? 'bg-blue-100 dark:bg-blue-900 font-semibold border-l-4 border-blue-500'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        }
                        `}
                        onClick={() => {
                            const echo = getEcho()
                            if (currentConvId && echo) {
                                echo.leave(`conversation.${currentConvId}`)
                            }
                            dispatch(setConversationId(conv.id))
                            dispatch(fetchMessages(conv.id))
                            if (echo) {
                                echo.join(`conversation.${conv.id}`)
                                    .listen('MessageSent', (e: any) => {
                                        const newMessage = e.message
                                        dispatch(addMessage(newMessage))
                                    })
                            }
                            if (onSelect) onSelect();
                        }}
                    >
                        <Avatar src={avatar} alt={title} size={42} />
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-base">{title}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                {lastMsg}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
