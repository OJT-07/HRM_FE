import { configureStore } from '@reduxjs/toolkit'
import employee from './pages/Employees/employee.reducer'

export const store = configureStore({
  reducer: { employee: employee }
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch