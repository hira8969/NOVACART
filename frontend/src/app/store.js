import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import authReducer from '../features/authSlice';
import wishlistReducer from '../features/wishlistSlice';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    ui: uiReducer
  }
});
