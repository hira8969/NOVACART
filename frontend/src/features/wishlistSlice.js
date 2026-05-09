import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: []
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      state.items = exists ? state.items.filter((item) => item.id !== action.payload.id) : [...state.items, action.payload];
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
