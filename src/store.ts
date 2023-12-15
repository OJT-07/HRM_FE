import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  // reducer: { employee: employee }
  reducer: {}
});

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
