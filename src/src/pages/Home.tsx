// src/pages/Home.tsx
import { ConversationList } from '@/components/ConversationList'
import { MessageList } from '@/components/MessageList'
import { MessageInput} from "@/components/MessageInput";

const Home: React.FC = () => {
    return (
        <div className="flex h-[calc(100vh-100px)] bg-white border rounded shadow">
            {/* Danh sách cuộc trò chuyện bên trái */}
            <div className="w-1/3 border-r h-full">
                <ConversationList />
            </div>

            {/* Khu vực tin nhắn bên phải */}
            <div className="w-2/3 h-full flex flex-col">
                {/* Phần danh sách tin nhắn chiếm toàn bộ chiều cao trừ phần input */}
                <div className="flex-grow">
                    <MessageList />
                </div>
                {/* Phần ô nhập tin nhắn ở cuối */}
                <MessageInput />
            </div>
        </div>
    )
}
export default Home;
