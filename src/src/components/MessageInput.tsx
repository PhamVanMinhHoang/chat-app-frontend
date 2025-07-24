import { useState, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { sendMessage } from '@/features/chat/messageSlice'

export const MessageInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const conversationId = useAppSelector(state => state.messages.conversationId)
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!conversationId || text.trim() === '') return  // Không gửi nếu chưa chọn cuộc trò chuyện hoặc nội dung rỗng
        // Dispatch thunk gửi tin nhắn mới
        dispatch(sendMessage({ conversationId, content: text }))
        setText('')  // Xóa nội dung ô input sau khi gửi
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 border-t flex items-center">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={conversationId ? "Nhập tin nhắn..." : "Chọn một cuộc trò chuyện để nhắn"}
                className="flex-grow border rounded px-3 py-2 focus:outline-none"
                disabled={!conversationId}
            />
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded disabled:opacity-50"
                disabled={!conversationId || text.trim() === ''}
            >
                Gửi
            </button>

        </form>
    )
}
