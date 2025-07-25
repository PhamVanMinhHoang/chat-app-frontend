import { Avatar } from './Avatar';

interface ConversationItemProps {
    conversation: {
        id: number;
        name?: string;
        users?: { id: number; name: string; avatar?: string; is_current_user?: boolean }[];
        avatar?: string;
        last_message?: { content: string };
        unreadCount?: number;
    };
    active: boolean;
    onSelect: (id: number) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, active, onSelect }) => {
    const { id, name, users, avatar: convAvatar, last_message } = conversation;

    let title = name || 'Cuộc trò chuyện';
    let avatarSrc = convAvatar || '/default-avatar.png';

    if (!name && users?.length === 2) {
        const other = users.find(u => !u.is_current_user);
        title = other ? other.name : title;
        avatarSrc = other?.avatar || avatarSrc;
    }

    const lastMsg = last_message?.content || 'Chưa có tin nhắn nào';

    return (
        <div
            onClick={() => onSelect(id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
        ${active
                ? 'bg-purple-700 text-white'
                : 'hover:bg-gray-700 hover:text-white text-gray-300'}`}
        >
            <Avatar src={avatarSrc} alt={title} size={40} />
            <div className="min-w-0 flex-1">
                <p className={`truncate font-medium ${active ? 'text-white' : 'text-gray-100'}`}>
                    {title}
                </p>
                <p className="truncate text-xs text-gray-400">{lastMsg}</p>
            </div>
            {conversation.unreadCount! > 0 && (
                <span className="text-xs bg-red-600 rounded-full px-2 py-1 text-white font-semibold">
          {conversation.unreadCount}
        </span>
            )}
        </div>
    );
};
