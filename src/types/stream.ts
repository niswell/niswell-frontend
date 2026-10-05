export type StreamStatus = 'scheduled' | 'live' | 'ended' | 'archived';

export interface Stream {
  id: string;
  title: string;
  description?: string;
  status: StreamStatus;
  creatorProfileId: string;
  creatorName: string;
  creatorAvatar?: string;
  startedAt?: Date;
  endedAt?: Date;
  viewerCount: number;
  peakViewerCount: number;
  isPrivate: boolean;
  thumbnail?: string;
  duration?: number;
  createdAt: Date;
}

export interface StreamViewerMetrics {
  currentViewers: number;
  peakViewers: number;
  averageWatchDuration: number;
  totalEngagements: number;
}

export interface StreamSettings {
  title: string;
  description?: string;
  isPrivate: boolean;
  allowChat: boolean;
  allowTips: boolean;
}

export interface StreamRecording {
  id: string;
  streamId: string;
  fileName: string;
  fileUrl: string;
  duration: number;
  size: bigint;
  status: 'processing' | 'ready' | 'archived' | 'deleted';
  createdAt: Date;
}

export interface StreamViewer {
  id: string;
  streamId: string;
  viewerProfileId: string;
  joinedAt: Date;
  leftAt?: Date;
  watchDuration?: number;
  connectionQuality?: string;
}
