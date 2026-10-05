import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface Modal {
  id: string;
  title: string;
  content: React.ReactNode;
  actions?: Array<{ label: string; action: () => void }>;
}

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: Modal[];
  isFullscreen: boolean;
  showChat: boolean;
  showControls: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'dark',
  notifications: [],
  modals: [],
  isFullscreen: false,
  showChat: true,
  showControls: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addModal: (state, action: PayloadAction<Modal>) => {
      state.modals.push(action.payload);
    },
    removeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(m => m.id !== action.payload);
    },
    clearModals: (state) => {
      state.modals = [];
    },
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.isFullscreen = action.payload;
    },
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen;
    },
    setShowChat: (state, action: PayloadAction<boolean>) => {
      state.showChat = action.payload;
    },
    toggleChat: (state) => {
      state.showChat = !state.showChat;
    },
    setShowControls: (state, action: PayloadAction<boolean>) => {
      state.showControls = action.payload;
    },
    toggleControls: (state) => {
      state.showControls = !state.showControls;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  addModal,
  removeModal,
  clearModals,
  setFullscreen,
  toggleFullscreen,
  setShowChat,
  toggleChat,
  setShowControls,
  toggleControls,
} = uiSlice.actions;

export default uiSlice.reducer;
