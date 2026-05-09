import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  coupon: null,
  shipping: 14
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((product) => product.id === action.payload.id);
      if (item) item.quantity += action.payload.quantity || 1;
      else state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((product) => product.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload.toUpperCase() === 'NOVA20' ? { code: 'NOVA20', discount: 0.2 } : null;
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
    }
  }
});

export const selectCartTotals = (state) => {
  const subtotal = state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = state.cart.coupon ? subtotal * state.cart.coupon.discount : 0;
  const tax = (subtotal - discount) * 0.08;
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : state.cart.shipping;
  return { subtotal, discount, tax, shipping, total: subtotal - discount + tax + shipping };
};

export const { addToCart, updateQuantity, removeFromCart, applyCoupon, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
