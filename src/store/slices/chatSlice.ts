import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, TypingIndicator } from '../../types';

interface ChatState {
  messages: ChatMessage[];
  typingUsers: TypingIndicator[];
  pinnedMessages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: ChatState = {
  messages: [],
  typingUsers: [],
  pinnedMessages: [],
  isLoading: false,
  error: null,
  hasMore: true,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      if (action.payload.isPinned) {
        state.pinnedMessages.push(action.payload);
      }
    },
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
      state.pinnedMessages = action.payload.filter(m => m.isPinned);
    },
    prependMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = [...action.payload, ...state.messages];
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(m => m.id !== action.payload);
      state.pinnedMessages = state.pinnedMessages.filter(m => m.id !== action.payload);
    },
    updateMessage: (state, action: PayloadAction<ChatMessage>) => {
      const index = state.messages.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
      if (action.payload.isPinned) {
        const pinnedIndex = state.pinnedMessages.findIndex(m => m.id === action.payload.id);
        if (pinnedIndex === -1) {
          state.pinnedMessages.push(action.payload);
        } else {
          state.pinnedMessages[pinnedIndex] = action.payload;
        }
      } else {
        state.pinnedMessages = state.pinnedMessages.filter(m => m.id !== action.payload.id);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
      state.pinnedMessages = [];
    },
    addTypingIndicator: (state, action: PayloadAction<TypingIndicator>) => {
      const exists = state.typingUsers.find(u => u.userId === action.payload.userId);
      if (!exists) {
        state.typingUsers.push(action.payload);
      }
    },
    removeTypingIndicator: (state, action: PayloadAction<string>) => {
      state.typingUsers = state.typingUsers.filter(u => u.userId !== action.payload);
    },
    clearTypingIndicators: (state) => {
      state.typingUsers = [];
    },
    setPinnedMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.pinnedMessages = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const {
  addMessage,
  setMessages,
  prependMessages,
  deleteMessage,
  updateMessage,
  clearMessages,
  addTypingIndicator,
  removeTypingIndicator,
  clearTypingIndicators,
  setPinnedMessages,
  setLoading,
  setError,
  setHasMore,
} = chatSlice.actions;

export default chatSlice.reducer;
