import { createSlice } from '@reduxjs/toolkit';

const demoUser = {
  name: 'Demo Shopper',
  email: 'demo@novacart.dev',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: demoUser,
    isAuthenticated: true,
    verificationPending: false
  },
  reducers: {
    login: (state, action) => {
      state.user = { ...demoUser, ...action.payload };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      state.user = { ...demoUser, ...action.payload, role: 'user' };
      state.isAuthenticated = true;
      state.verificationPending = true;
    }
  }
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
