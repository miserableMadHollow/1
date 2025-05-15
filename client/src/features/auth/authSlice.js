import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'), // Важно!
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role; // Сохраняем роль
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role); // Сохраняем в localStorage
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;