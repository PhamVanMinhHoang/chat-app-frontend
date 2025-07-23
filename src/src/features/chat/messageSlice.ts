import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMessagesApi, sendMessageApi } from '@/features/chat/messageService';

// Định nghĩa kiểu dữ liệu cho Message
interface Message {
    id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    created_at: string;
    sender: { id: number; name: string };  // thông tin người gửi (đã load kèm)
    // ... các trường khác như reactions, attachments nếu cần
}

// Định nghĩa kiểu dữ liệu cho MessageState
interface MessagesState {
    conversationId: number | null;
    items: Message[];
    loading: boolean;
    error: string | null;
}

// Giá trị khởi tạo cho MessageState
const initialState: MessagesState = {
    conversationId: null,
    items: [],
    loading: false,
    error: null
}

// Thunk lấy tin nhắn của một cuộc trò chuyện
export const fetchMessages = createAsyncThunk<
    Message[],                // kiểu dữ liệu trả về (mảng Message)
    number,                  // tham số truyền vào (conversationId)
    { rejectValue: string }  // kiểu lỗi
>('messages/fetchByConversation', async (convId, { rejectWithValue }) => {
    try {
        const res = await getMessagesApi(convId);
        // API trả về { success: true, data: [...] } (có thể kèm paginate info)
        const data = res.data.data;
        // Nếu có paginate, data sẽ là object có field data (mảng tin nhắn)
        const messages = Array.isArray(data) ? data : data.data;
        return messages as Message[];
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

// Thunk gửi tin nhắn mới
export const sendMessage = createAsyncThunk<
    Message,                // kiểu dữ liệu trả về (Message mới gửi)
    { conversationId: number; content: string },  // tham số truyền vào
    { rejectValue: string }  // kiểu lỗi
>('messages/sendMessage', async ({ conversationId, content }, { rejectWithValue }) => {
    try {
        const response = await sendMessageApi(conversationId, content);
        // API trả về { success: true, data: {...} } (tin nhắn mới)
        return response.data  // API trả về dữ liệu Message vừa tạo

    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

// Tạo slice cho tin nhắn
const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setConversationId(state, action: PayloadAction<number | null>) {
            state.conversationId = action.payload
            state.items = []  // reset danh sách tin nhắn khi chọn cuộc trò chuyện mới
            state.error = null
        },
        // Reduce thêm một tin nhắn mới vào state (sử dụng cho realtime hoặc sau khi gửi tin nhắn)
        addMessage(state, action: PayloadAction<Message>) {
            const newMsg = action.payload
            // Nếu tin nhăn này chưa có trong danh sách, thêm vào
            if (!state.items.find(msg => msg.id === newMsg.id)) {
                state.items.push(newMsg)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.reverse();
                // Đảo ngược mảng tin nhắn để tin cũ nhất nằm đầu (giúp hiển thị theo thời gian tăng dần)
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Lỗi tải tin nhắn';
            })

            // Xử lý gửi tin nhắn
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                // Thêm tin nhắn mới vào danh sách
                const sentMsg = action.payload
                // Thêm tin nhắn vừa gửi vào danh sách (nếu chưa có)
                if (!state.items.find(msg => msg.id === sentMsg.id)) {
                    state.items.push(sentMsg)
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Lỗi gửi tin nhắn';
            })
    },
});

// Export the setConversationId action for use in components
export const { setConversationId, addMessage } = messageSlice.actions;
export default messageSlice.reducer;