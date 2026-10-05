import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export default function MessageInput({
  onSend,
  onTypingStart,
  onTypingStop,
  disabled = false,
  placeholder = 'Type a message...',
  maxLength = 500,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle typing indicator
  useEffect(() => {
    if (message.length > 0) {
      if (!isTyping) {
        setIsTyping(true);
        onTypingStart?.();
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTypingStop?.();
      }, 1000);
    } else {
      if (isTyping) {
        setIsTyping(false);
        onTypingStop?.();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, onTypingStart, onTypingStop]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      setIsTyping(false);
      onTypingStop?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = message.length;
  const isNearLimit = charCount > maxLength * 0.8;
  const isOverLimit = charCount > maxLength;

  return (
    <div className="border-t border-dark-700 bg-dark-900 p-4">
      <div className="flex gap-2">
        {/* Emoji/Attachments Button */}
        <button
          disabled={disabled}
          className="flex-shrink-0 p-2 hover:bg-dark-800 rounded-lg text-gray-400 hover:text-white transition disabled:opacity-50"
          title="Add emoji or attachment"
        >
          <Plus size={20} />
        </button>

        {/* Message Input */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none resize-none transition disabled:opacity-50"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          {/* Character Count */}
          {charCount > 0 && (
            <div className="text-xs text-right mt-1">
              <span className={isOverLimit ? 'text-red-400' : isNearLimit ? 'text-amber-400' : 'text-gray-500'}>
                {charCount} / {maxLength}
              </span>
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim() || isOverLimit}
          className="flex-shrink-0 p-2 bg-primary-600 hover:bg-primary-500 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send message (Enter or Shift+Enter for new line)"
        >
          <Send size={20} />
        </button>
      </div>

      {/* Helper Text */}
      <div className="text-xs text-gray-500 mt-2">
        Press <kbd className="px-2 py-1 bg-dark-800 rounded text-gray-300">Enter</kbd> to send,{' '}
        <kbd className="px-2 py-1 bg-dark-800 rounded text-gray-300">Shift+Enter</kbd> for new line
      </div>
    </div>
  );
}
