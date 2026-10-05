import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Mic,
  MicOff,
} from 'lucide-react';

interface StreamControlsProps {
  isMuted: boolean;
  isFullscreen: boolean;
  quality: 'low' | 'medium' | 'high';
  audioEnabled: boolean;
  videoEnabled: boolean;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onQualityChange: (quality: 'low' | 'medium' | 'high') => void;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  className?: string;
}

export default function StreamControls({
  isMuted,
  isFullscreen,
  quality,
  audioEnabled,
  videoEnabled,
  onToggleMute,
  onToggleFullscreen,
  onQualityChange,
  onToggleAudio,
  onToggleVideo,
  className = '',
}: StreamControlsProps) {
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  return (
    <div
      className={`bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between gap-3 ${className}`}
    >
      {/* Left Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          className="p-2 hover:bg-white/20 rounded transition"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="text-white" size={20} />
          ) : (
            <Volume2 className="text-white" size={20} />
          )}
        </button>

        <div className="w-px h-6 bg-white/30"></div>

        <button
          onClick={onToggleAudio}
          className="p-2 hover:bg-white/20 rounded transition"
          title={audioEnabled ? 'Disable audio' : 'Enable audio'}
        >
          {audioEnabled ? (
            <Mic className="text-green-400" size={20} />
          ) : (
            <MicOff className="text-red-400" size={20} />
          )}
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Quality Selector */}
        <div className="relative">
          <button
            onClick={() => setShowQualityMenu(!showQualityMenu)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm text-white font-semibold transition flex items-center gap-2"
          >
            <Settings size={16} />
            {quality === 'low' && '360p'}
            {quality === 'medium' && '720p'}
            {quality === 'high' && '1080p'}
          </button>

          {showQualityMenu && (
            <div className="absolute right-0 mt-2 bg-dark-900 border border-dark-700 rounded-lg overflow-hidden z-10">
              {(['low', 'medium', 'high'] as const).map(q => (
                <button
                  key={q}
                  onClick={() => {
                    onQualityChange(q);
                    setShowQualityMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-dark-800 transition ${
                    quality === q ? 'bg-dark-700 text-primary-400' : 'text-gray-300'
                  }`}
                >
                  {q === 'low' && '360p (Low)'}
                  {q === 'medium' && '720p (Medium)'}
                  {q === 'high' && '1080p (High)'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 hover:bg-white/20 rounded transition"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize className="text-white" size={20} />
          ) : (
            <Maximize className="text-white" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
