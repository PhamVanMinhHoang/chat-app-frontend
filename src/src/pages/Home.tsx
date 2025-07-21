// src/pages/Home.tsx
import { ConversationList } from '@/components/ConversationList'
import { MessageList } from '@/components/MessageList'

const Home: React.FC = () => {
    return (
        <div className="flex h-[calc(100vh-100px)] bg-white border rounded shadow">
            {/* Danh sách cuộc trò chuyện bên trái */}
            <div className="w-1/3 border-r">
                <ConversationList />
            </div>

            {/* Khu vực tin nhắn bên phải */}
            <div className="flex-1 flex flex-col">
                <MessageList />
            </div>
        </div>
    )
}
export default Home;
