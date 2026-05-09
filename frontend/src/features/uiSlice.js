import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'dark',
    chatbotOpen: false
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    toggleChatbot: (state) => {
      state.chatbotOpen = !state.chatbotOpen;
    }
  }
});

export const { toggleTheme, toggleChatbot } = uiSlice.actions;
export default uiSlice.reducer;
