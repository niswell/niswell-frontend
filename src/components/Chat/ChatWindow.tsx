import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { clearMessages } from '../../store/slices/chatSlice';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import PinnedMessages from './PinnedMessages';
import { useSocket } from '../../hooks/useSocket';
import { useChatSocket } from '../../hooks/useChatSocket';

interface ChatWindowProps {
  streamId: string;
  userId: string;
  creatorId?: string;
}

export default function ChatWindow({ streamId, userId, creatorId }: ChatWindowProps) {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const { sendMessage, sendTypingStart, sendTypingStop, deleteMessageLocally, togglePinMessage } =
    useChatSocket(socket, streamId);

  const messages = useAppSelector(state => state.chat.messages);
  const typingUsers = useAppSelector(state => state.chat.typingUsers);
  const pinnedMessages = useAppSelector(state => state.chat.pinnedMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean up chat on unmount
  useEffect(() => {
    return () => {
      // Optionally clear messages when leaving chat
      // dispatch(clearMessages());
    };
  }, [dispatch]);

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessageLocally(messageId, userId);
  };

  const handleTogglePin = (messageId: string, isPinned: boolean) => {
    togglePinMessage(messageId, !isPinned);
  };

  return (
    <div className="h-full flex flex-col bg-dark-900 border-l border-dark-700">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 px-4 py-3">
        <h3 className="font-semibold text-white text-sm">Live Chat</h3>
        <p className="text-xs text-gray-400 mt-1">
          {messages.length} messages • {typingUsers.length} typing
        </p>
      </div>

      {/* Pinned Messages */}
      {pinnedMessages.length > 0 && (
        <PinnedMessages messages={pinnedMessages} onUnpin={handleTogglePin} />
      )}

      {/* Messages Container */}
      <div
        ref={messageListRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwn={message.senderProfileId === userId}
                isCreator={message.senderProfileId === creatorId}
                onDelete={handleDeleteMessage}
                onPin={handleTogglePin}
              />
            ))}
          </>
        )}

        {/* Typing Indicator */}
        <div className="pt-2">
          <TypingIndicator typingUsers={typingUsers} />
        </div>

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSend={handleSendMessage}
        onTypingStart={sendTypingStart}
        onTypingStop={sendTypingStop}
        placeholder="Type a message... (or Shift+Enter for new line)"
        maxLength={500}
      />
    </div>
  );
}
