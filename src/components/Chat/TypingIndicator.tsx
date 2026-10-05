import React from 'react';
import { TypingIndicator as TypingIndicatorType } from '../../types';

interface TypingIndicatorProps {
  typingUsers: TypingIndicatorType[];
}

export default function TypingIndicator({ typingUsers }: TypingIndicatorProps) {
  if (typingUsers.length === 0) return null;

  const displayText =
    typingUsers.length === 1
      ? `${typingUsers[0].username} is typing`
      : `${typingUsers.map(u => u.username).join(', ')} are typing`;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-lg text-sm text-gray-400 mb-2">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
      <span>{displayText}</span>
    </div>
  );
}
