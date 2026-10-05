import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  stream: MediaStream | null;
  isLocal?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({
  stream,
  isLocal = false,
  autoPlay = true,
  muted = true,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      setVideoReady(true);
    }
  }, [stream]);

  useEffect(() => {
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(err => console.error('Play error:', err));
      }
    }
  }, [autoPlay]);

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={muted || isLocal}
        playsInline
        className="w-full h-full object-cover"
      />
      {!videoReady && (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p className="text-gray-400 mt-4">Loading video...</p>
          </div>
        </div>
      )}
      {isLocal && videoReady && (
        <div className="absolute top-3 right-3 bg-black/50 px-3 py-1 rounded text-sm text-gray-300">
          You
        </div>
      )}
    </div>
  );
}
