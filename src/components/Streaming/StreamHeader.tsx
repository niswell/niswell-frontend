import React from 'react';
import { Heart, Share2, MoreVertical } from 'lucide-react';
import { Stream } from '../../types';

interface StreamHeaderProps {
  stream: Stream;
  onFollow?: () => void;
  onShare?: () => void;
  onMore?: () => void;
  isFollowing?: boolean;
}

export default function StreamHeader({
  stream,
  onFollow,
  onShare,
  onMore,
  isFollowing = false,
}: StreamHeaderProps) {
  return (
    <div className="bg-dark-900 border-b border-dark-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{stream.title}</h1>
            <p className="text-gray-400 text-sm">{stream.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onShare}
              className="p-2 hover:bg-dark-800 rounded-lg transition text-gray-300 hover:text-white"
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={onMore}
              className="p-2 hover:bg-dark-800 rounded-lg transition text-gray-300 hover:text-white"
              title="More options"
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
              {stream.creatorName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{stream.creatorName}</p>
              <p className="text-sm text-gray-400">Creator</p>
            </div>
          </div>

          <button
            onClick={onFollow}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              isFollowing
                ? 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            <Heart size={18} fill={isFollowing ? 'currentColor' : 'none'} />
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}
