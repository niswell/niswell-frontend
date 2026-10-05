import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stream, StreamSettings, StreamViewerMetrics } from '../../types';

interface StreamState {
  activeStream: Stream | null;
  streams: Stream[];
  isStreaming: boolean;
  streamSettings: StreamSettings;
  metrics: StreamViewerMetrics | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StreamState = {
  activeStream: null,
  streams: [],
  isStreaming: false,
  streamSettings: {
    title: '',
    description: '',
    isPrivate: false,
    allowChat: true,
    allowTips: true,
  },
  metrics: null,
  isLoading: false,
  error: null,
};

const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    setActiveStream: (state, action: PayloadAction<Stream | null>) => {
      state.activeStream = action.payload;
    },
    setStreams: (state, action: PayloadAction<Stream[]>) => {
      state.streams = action.payload;
    },
    addStream: (state, action: PayloadAction<Stream>) => {
      state.streams.push(action.payload);
    },
    updateStream: (state, action: PayloadAction<Stream>) => {
      const index = state.streams.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.streams[index] = action.payload;
      }
      if (state.activeStream?.id === action.payload.id) {
        state.activeStream = action.payload;
      }
    },
    removeStream: (state, action: PayloadAction<string>) => {
      state.streams = state.streams.filter(s => s.id !== action.payload);
      if (state.activeStream?.id === action.payload) {
        state.activeStream = null;
      }
    },
    setIsStreaming: (state, action: PayloadAction<boolean>) => {
      state.isStreaming = action.payload;
    },
    updateStreamSettings: (state, action: PayloadAction<Partial<StreamSettings>>) => {
      state.streamSettings = { ...state.streamSettings, ...action.payload };
    },
    setMetrics: (state, action: PayloadAction<StreamViewerMetrics | null>) => {
      state.metrics = action.payload;
    },
    updateViewerCount: (state, action: PayloadAction<{ streamId: string; count: number }>) => {
      const stream = state.streams.find(s => s.id === action.payload.streamId);
      if (stream) {
        stream.viewerCount = action.payload.count;
        if (stream.viewerCount > stream.peakViewerCount) {
          stream.peakViewerCount = stream.viewerCount;
        }
      }
      if (state.activeStream?.id === action.payload.streamId) {
        state.activeStream.viewerCount = action.payload.count;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setActiveStream,
  setStreams,
  addStream,
  updateStream,
  removeStream,
  setIsStreaming,
  updateStreamSettings,
  setMetrics,
  updateViewerCount,
  setLoading,
  setError,
} = streamSlice.actions;

export default streamSlice.reducer;
