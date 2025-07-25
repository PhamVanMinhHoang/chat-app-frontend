// src/components/MessageBubble.tsx
import { Avatar } from './Avatar';

type MessageProps = {
    message: {
        content: string;
        senderName?: string;
        senderAvatar?: string;
        time?: string;
    };
    isOwn: boolean;
    showAvatar: boolean;
    showName: boolean;
};

export const MessageBubble: React.FC<MessageProps> = ({message,isOwn,showAvatar,showName}) => {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} items-end`}>
            {!isOwn && showAvatar && (
                <div className="mr-2">
                    <Avatar
                        src={message.senderAvatar || '/default-avatar.png'}
                        alt={message.senderName}
                        size={32}
                    />
                </div>
            )}

            <div className="max-w-md">
                {showName && !isOwn && (
                    <div className="text-xs text-gray-500 mb-1">{message.senderName}</div>
                )}
                <div
                    className={`
            px-4 py-2 text-sm whitespace-pre-line
            rounded-2xl 
            ${isOwn
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'}
          `}
                >
                    {message.content}
                </div>
                {message.time && (
                    <div
                        className={`text-xs mt-1 text-gray-400 ${
                            isOwn ? 'text-right' : 'text-left'
                        }`}
                    >
                        {message.time}
                    </div>
                )}
            </div>
        </div>
    );
};
