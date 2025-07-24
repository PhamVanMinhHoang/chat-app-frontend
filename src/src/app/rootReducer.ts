import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import conversationReducer from '@/features/chat/conversationSlice'
import messageReducer from '@/features/chat/messageSlice'
import uiReducer from '@/features/ui/uiSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    conversations: conversationReducer,
    messages: messageReducer,
    ui: uiReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer