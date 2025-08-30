// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import todoReducer from '../redux/features/todoSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer
    },
});