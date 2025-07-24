import { useAppSelector } from '@/hooks/redux';
import { MessageBubble } from './MessageBubble';

export const MessageList = () => {
    const messages = useAppSelector(state => state.messages.items);
    const currentUser = useAppSelector(state => state.auth.user);

    return (
        <div className="flex flex-col p-4 gap-2 overflow-y-auto h-full bg-white dark:bg-gray-900">
            {messages.map(msg => (
                <MessageBubble
                    key={msg.id}
                    message={{
                        ...msg,
                        senderAvatar: msg.sender?.avatar,
                        senderName: msg.sender?.name,
                        time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }}
                    isOwn={msg.sender_id === currentUser?.id}
                    showAvatar={true}
                    showName={true}
                />
            ))}
        </div>
    );
};
