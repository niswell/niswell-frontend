import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import StreamHeader from './StreamHeader';
import ViewerCount from './ViewerCount';
import StreamControls from './StreamControls';
import ChatWindow from '../Chat/ChatWindow';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useSocket } from '../../hooks/useSocket';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { setActiveStream, updateViewerCount } from '../../store/slices/streamSlice';
import { Stream } from '../../types';

export default function StreamContainer() {
  const { id: streamId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { socket, isConnected } = useSocket();
  const { localStream, remoteStream, error: webrtcError } = useWebRTC(socket, streamId || '');

  const activeStream = useAppSelector(state => state.stream.activeStream);
  const userId = useAppSelector(state => state.auth.user?.userId || '');

  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock stream data - replace with API call
  useEffect(() => {
    if (streamId) {
      const mockStream: Stream = {
        id: streamId,
        title: 'Live Streaming Session',
        description: 'Join us for an amazing live stream!',
        status: 'live',
        creatorProfileId: 'creator-1',
        creatorName: 'StreamCreator',
        creatorAvatar: 'https://via.placeholder.com/48',
        startedAt: new Date(),
        viewerCount: 1234,
        peakViewerCount: 5678,
        isPrivate: false,
        createdAt: new Date(),
      };
      dispatch(setActiveStream(mockStream));
    }
  }, [streamId, dispatch]);

  // Update viewer count
  useEffect(() => {
    if (!streamId || !socket) return;

    const handleViewerUpdate = (data: { streamId: string; viewerCount: number }) => {
      if (data.streamId === streamId) {
        dispatch(updateViewerCount({ streamId, count: data.viewerCount }));
      }
    };

    socket.on('stream:viewer-count', handleViewerUpdate);
    return () => {
      socket.off('stream:viewer-count', handleViewerUpdate);
    };
  }, [streamId, socket, dispatch]);

  const handleToggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const handleToggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  const handleToggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  if (!activeStream) {
    return (
      <div className="h-screen bg-dark-950 flex items-center justify-center text-gray-400">
        Loading stream...
      </div>
    );
  }

  return (
    <div className="bg-dark-950 text-white min-h-screen">
      {/* Header */}
      <StreamHeader
        stream={activeStream}
        isFollowing={isFollowing}
        onFollow={() => setIsFollowing(!isFollowing)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Video Player */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
                {remoteStream ? (
                  <VideoPlayer
                    stream={remoteStream}
                    autoPlay
                    muted={false}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                      <p className="text-gray-400">Connecting to stream...</p>
                    </div>
                  </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <StreamControls
                    isMuted={isMuted}
                    isFullscreen={isFullscreen}
                    quality={quality}
                    audioEnabled={audioEnabled}
                    videoEnabled={videoEnabled}
                    onToggleMute={() => setIsMuted(!isMuted)}
                    onToggleFullscreen={handleToggleFullscreen}
                    onQualityChange={setQuality}
                    onToggleAudio={handleToggleAudio}
                    onToggleVideo={handleToggleVideo}
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>
              </div>

              {/* Viewer Stats */}
              {activeStream && (
                <ViewerCount
                  current={activeStream.viewerCount}
                  peak={activeStream.peakViewerCount}
                />
              )}

              {/* Error Messages */}
              {(webrtcError || !isConnected) && (
                <div className="bg-red-900/20 border border-red-600 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {webrtcError || 'Connection issue - reconnecting...'}
                </div>
              )}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-dark-900 border border-dark-700 rounded-lg overflow-hidden h-96">
              <ChatWindow
                streamId={streamId || ''}
                userId={userId}
                creatorId={activeStream?.creatorProfileId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
