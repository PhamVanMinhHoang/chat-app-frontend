// src/components/MessageList.tsx
import { useAppSelector } from '@/hooks/redux';
import { MessageBubble } from './MessageBubble';
import { selectUser } from '@/features/auth/authSlice';

export const MessageList: React.FC = () => {
    const messages = useAppSelector((state) => state.messages.items);
    const currentUserId = useAppSelector((state) => state.auth.user?.id);

    return (
        <div className="flex flex-col px-4 py-3 space-y-2 overflow-y-auto bg-gray-50 dark:bg-gray-900 h-full">
            {messages.map((msg, idx) => {
                const isOwn = msg.sender_id === currentUserId;

                const prevMsg = messages[idx - 1];
                const sameSenderAsPrev = prevMsg && prevMsg.sender_id === msg.sender_id;

                const showAvatar = !isOwn && !sameSenderAsPrev;
                const showName = !sameSenderAsPrev;

                return (
                    <MessageBubble
                        key={msg.id}
                        message={{
                            content: msg.content,
                            senderName: msg.sender.name,
                            senderAvatar: msg.sender.avatar,
                            time: new Date(msg.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            }),
                        }}
                        isOwn={isOwn}
                        showAvatar={showAvatar}
                        showName={showName}
                    />
                );
            })}
        </div>
    );
};
