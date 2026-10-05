import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Pin } from 'lucide-react';
import { ChatMessage } from '../../types';

interface PinnedMessagesProps {
  messages: ChatMessage[];
  onUnpin?: (messageId: string, isPinned: boolean) => void;
}

export default function PinnedMessages({ messages, onUnpin }: PinnedMessagesProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (messages.length === 0) return null;

  return (
    <div className="bg-dark-800 border-b border-dark-700">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-dark-700 transition"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
          <Pin size={16} className="text-amber-500" />
          Pinned Messages ({messages.length})
        </div>
        {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </button>

      {!isCollapsed && (
        <div className="border-t border-dark-700 max-h-48 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className="px-4 py-3 border-b border-dark-700 last:border-b-0 hover:bg-dark-700 transition flex items-start justify-between gap-2 group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 mb-1">{message.senderName}</p>
                <p className="text-sm text-gray-200 truncate">{message.message}</p>
              </div>
              <button
                onClick={() => onUnpin?.(message.id, false)}
                className="flex-shrink-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-dark-600 rounded text-gray-400 hover:text-gray-200 transition"
                title="Unpin"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
