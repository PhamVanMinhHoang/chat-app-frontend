import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMessagesApi } from '@/features/chat/messageService';

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

// Tạo slice cho tin nhắn
const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setConversationId(state, action: PayloadAction<number | null>) {
            state.conversationId = action.payload;
            state.items = [];  // reset messages when switching conv
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
            });
    },
});

// Export the setConversationId action for use in components
export const { setConversationId } = messageSlice.actions;
export default messageSlice.reducer;