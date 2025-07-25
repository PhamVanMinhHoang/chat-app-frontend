// src/components/MessageInput.tsx
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { sendMessage } from '@/features/chat/messageSlice';
import { Paperclip, Smile, Send } from 'lucide-react';

export const MessageInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const conversationId = useAppSelector((state) => state.messages.conversationId);
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Tự động giãn dòng cho textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }, [text]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!conversationId || text.trim() === '') return;
        dispatch(sendMessage({ conversationId, content: text }));
        setText('');
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex items-end gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-inner"
        >
            {/* Nút đính kèm */}
            <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title="Đính kèm tệp"
            >
                <Paperclip className="w-5 h-5 text-gray-500" />
            </button>

            {/* Textarea nhập tin */}
            <textarea
                ref={textareaRef}
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white
                dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />

            {/* Nút emoji */}
            <button
                type="button"
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition"
                title="Chèn emoji"
            >
                <Smile className="w-5 h-5" />
            </button>

            {/* Nút gửi */}
            <button
                type="submit"
                disabled={text.trim() === ''}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow transition"
                title="Gửi"
            >
                <Send className="w-5 h-5" />
            </button>
        </form>
    );
};
