import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ConversationList } from '@/components/ConversationList';
import { MessageList } from '@/components/MessageList';
import { MessageInput } from '@/components/MessageInput';

export default function Home() {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-72 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-800 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                    <span className="text-lg font-bold">Chat App</span>
                    <ThemeSwitcher />
                </div>
                <ConversationList />
            </aside>
            {/* Main chat area */}
            <main className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <MessageList />
                </div>
                <MessageInput />
            </main>
        </div>
    );
}
