import React, { useState } from 'react';
import { Pin, Trash2, MoreVertical } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
  isCreator?: boolean;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string, isPinned: boolean) => void;
  showActions?: boolean;
}

export default function ChatMessage({
  message,
  isOwn,
  isCreator = false,
  onDelete,
  onPin,
  showActions = true,
}: ChatMessageProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageTypeDisplay = () => {
    switch (message.messageType) {
      case 'tip_notification':
        return '💰 Tip';
      case 'system':
        return '📢 System';
      default:
        return null;
    }
  };

  return (
    <div className={`group mb-3 flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
          isCreator ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-gray-600 to-gray-700'
        }`}>
          {message.senderName?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs font-semibold text-gray-200">
            {message.senderName}
            {isCreator && <span className="ml-1 text-xs bg-purple-600 px-2 py-0.5 rounded text-white">Creator</span>}
          </span>
          <span className="text-xs text-gray-500">{formatTime(message.createdAt)}</span>
        </div>

        {/* Message Type Badge */}
        {getMessageTypeDisplay() && (
          <div className="text-xs text-amber-400 mb-1">{getMessageTypeDisplay()}</div>
        )}

        {/* Message Bubble */}
        <div className={`relative max-w-xs px-4 py-2 rounded-lg ${
          message.messageType === 'system'
            ? 'bg-dark-700 text-gray-300 text-center text-sm italic'
            : isOwn
            ? 'bg-primary-600 text-white'
            : 'bg-dark-700 text-gray-100'
        }`}>
          <p className="break-words text-sm">{message.message}</p>

          {/* Pinned Badge */}
          {message.isPinned && (
            <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1">
              <Pin size={12} />
            </div>
          )}
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className={`mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isOwn ? 'flex-row-reverse' : 'flex-row'} flex gap-1`}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-dark-700 rounded text-gray-400 hover:text-gray-200 transition"
              title="More actions"
            >
              <MoreVertical size={14} />
            </button>

            {/* Actions Dropdown */}
            {showMenu && (
              <div className={`absolute ${isOwn ? 'right-0' : 'left-0'} mt-1 bg-dark-800 border border-dark-600 rounded-lg shadow-lg z-10 min-w-max`}>
                <button
                  onClick={() => {
                    onPin?.(message.id, !message.isPinned);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white flex items-center gap-2"
                >
                  <Pin size={14} />
                  {message.isPinned ? 'Unpin' : 'Pin'}
                </button>

                {isOwn && (
                  <button
                    onClick={() => {
                      onDelete?.(message.id);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-dark-700 hover:text-red-300 flex items-center gap-2 border-t border-dark-600"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
