import type { RootState } from './rootReducer'
import type { store } from './store'

export type AppDispatch = typeof store.dispatch
export type { RootState }