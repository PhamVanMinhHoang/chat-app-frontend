import store from './storeInstance';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;