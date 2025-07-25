// src/pages/Home.tsx
import { useAppSelector } from '@/hooks/redux';
import { MessageList } from '@/components/MessageList';
import { MessageInput } from '@/components/MessageInput';

export default function Home() {
    const conversationId = useAppSelector((state) => state.messages.conversationId);

    if (!conversationId) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>Hãy chọn một cuộc trò chuyện để bắt đầu.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                <MessageList />
            </div>
            <MessageInput />
        </div>
    );
}
