import type { RootState } from '@/app/types'

export const selectAuth = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token)