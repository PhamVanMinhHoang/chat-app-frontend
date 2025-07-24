import { Avatar } from './Avatar';

type Props = {
    message: any;
    isOwn: boolean;
    showAvatar?: boolean;
    showName?: boolean;
};
export const MessageBubble = ({ message, isOwn, showAvatar, showName }: Props) => (
    <div className={`flex items-end gap-2 my-2 ${isOwn ? 'justify-end' : ''}`}>
        {!isOwn && showAvatar && <Avatar src={message.senderAvatar} fallback={message.senderName?.[0]} size={32} />}
        <div>
            {showName && (
                <div className={`${isOwn ? 'text-right' : ''} text-xs mb-1`}>
                    {isOwn ? 'Bạn' : message.senderName}
                    <span className="ml-2 text-gray-400">{message.time}</span>
                </div>
            )}
            <div className={`
        px-4 py-2 max-w-xs rounded-2xl
        ${isOwn
                ? 'bg-blue-500 text-white rounded-br-none ml-auto'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
            }`}>
                {message.content}
            </div>
        </div>
        {isOwn && showAvatar && <Avatar src={message.senderAvatar} fallback={message.senderName?.[0]} size={32} />}
    </div>
);
