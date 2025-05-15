import { configureStore } from '@reduxjs/toolkit';
import weaponsReducer from '../features/weapons/weaponsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    weapons: weaponsReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
