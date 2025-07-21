import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationsApi } from "@/features/chat/conversationService";

// Định nghĩa kiểu dữ liệu cho User
interface User {
    id: number;
    name: string;
}

// Định nghĩa kiểu dữ liệu cho MessagePreview
interface MessagePreview {
    id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    created_at: string;
}

// Định nghĩa kiểu dữ liệu cho Conversation
interface Conversation {
    id: number;
    name: string | null;
    type: string;
    updated_at: string;
    users: User[];             // danh sách user trong cuộc trò chuyện
    lastMessage: MessagePreview | null;  // tin nhắn cuối cùng (nếu có)
}

// Thunk lấy danh sách cuộc trò chuyện
export const fetchConversations = createAsyncThunk<
    Conversation[],             // kiểu dữ liệu trả về (mảng Conversation)
    void,                       // tham số truyền vào (không có)
    { rejectValue: string }     // kiểu lỗi
>(
  "conversations/fetchConversations",
  async (_, { rejectWithValue }) => {
      try {
          const res = await getConversationsApi();
          // Giả sử API trả về { success: true, data: {...} }
          // Dữ liệu thật nằm trong res.data.data (nếu paginate) hoặc res.data.data[]
          const data = res.data.data;
          // Nếu data là object có field data (do paginate), lấy data.data
          const conversations = Array.isArray(data) ? data : data.data;
          return conversations as Conversation[];
      } catch (err: any) {
          // Lấy thông báo lỗi từ response nếu có
          return rejectWithValue(err.response?.data?.message || err.message);
      }
  }
);

// Định nghĩa kiểu dữ liệu cho ConversationState
interface ConversationState {
    items: Conversation[];  // danh sách cuộc trò chuyện
    loading: boolean;                // trạng thái tải dữ liệu
    error: string | null;           // thông báo lỗi (nếu có)
}

// Giá trị khởi tạo cho ConversationState
const initialState: ConversationState = {
    items: [],
    loading: false,
    error: null
};

// Tạo slice cho cuộc trò chuyện
const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        // Có thể thêm các reducer khác nếu cần
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // cập nhật danh sách cuộc trò chuyện
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || "Lỗi lấy cuộc trò chuyện";
            });
    },
});

// Xuất reducer
export default conversationSlice.reducer;
