import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { sendMessage } from '@/features/chat/messageSlice';

export const MessageInput = () => {
    const dispatch = useAppDispatch();
    const [messageText, setMessageText] = useState('');
    const conversationId = useAppSelector(state => state.messages.conversationId);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!conversationId || !messageText.trim()) return;
        dispatch(sendMessage({ conversationId, content: messageText }));
        setMessageText('');
    };

    return (
        <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-800 flex items-center bg-white dark:bg-gray-900">
            <input
                type="text"
                className="flex-1 rounded-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập tin nhắn..."
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
            />
            <button
                type="submit"
                className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
                disabled={!messageText.trim()}
            >
                Gửi
            </button>
        </form>
    );
};
