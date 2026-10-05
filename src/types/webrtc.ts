import SimplePeer from 'simple-peer';

export interface PeerConnection {
  peerId: string;
  userId: string;
  role: 'creator' | 'viewer';
  peer: SimplePeer.Instance;
  stream?: MediaStream;
  connectionState?: RTCPeerConnectionState;
  connectionQuality?: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface MediaSettings {
  videoEnabled: boolean;
  audioEnabled: boolean;
  quality: 'low' | 'medium' | 'high';
  resolution: '360p' | '720p' | '1080p';
}

export interface MediaConstraints {
  video?: boolean | MediaTrackConstraints;
  audio?: boolean | MediaTrackConstraints;
}

export interface WebRTCStats {
  videoBitrate: number;
  audioBitrate: number;
  videoPacketsLost: number;
  audioPacketsLost: number;
  connectionState: string;
  iceConnectionState: string;
  roundTripTime: number;
}

export interface ICEServer {
  urls: string[];
  username?: string;
  credential?: string;
}

export interface RTCConfig {
  iceServers: ICEServer[];
  iceCandidatePoolSize?: number;
}
