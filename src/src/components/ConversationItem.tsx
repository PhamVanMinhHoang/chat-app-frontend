import { Avatar } from './Avatar';

type Props = {
    conversation: any;
    isActive: boolean;
    onSelect: () => void;
};
export const ConversationItem = ({ conversation, isActive, onSelect }: Props) => (
    <div
        onClick={onSelect}
        className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl transition
      ${isActive ? 'bg-blue-100 dark:bg-blue-900 font-semibold' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
    >
        <Avatar src={conversation.avatar} fallback={conversation.name?.[0]} />
        <div className="min-w-0 flex-1">
            <div className="truncate">{conversation.name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{conversation.last_message?.content || ''}</div>
        </div>
    </div>
);
