import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import conversationReducer from '@/features/chat/conversationSlice'
import messageReducer from '@/features/chat/messageSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    conversations: conversationReducer,
    messages: messageReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer