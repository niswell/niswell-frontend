import { useEffect, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { useAppDispatch } from '../store/store';
import { addMessage, deleteMessage, updateMessage, addTypingIndicator, removeTypingIndicator } from '../store/slices/chatSlice';
import { ChatMessage, TypingIndicator } from '../types';

export function useChatSocket(socket: Socket | null, streamId: string) {
  const dispatch = useAppDispatch();

  // Handle incoming chat message
  const handleChatMessage = useCallback(
    (data: ChatMessage) => {
      dispatch(addMessage(data));
    },
    [dispatch]
  );

  // Handle message deletion
  const handleMessageDeleted = useCallback(
    (data: { messageId: string }) => {
      dispatch(deleteMessage(data.messageId));
    },
    [dispatch]
  );

  // Handle message update (pinned status)
  const handleMessageUpdated = useCallback(
    (data: ChatMessage) => {
      dispatch(updateMessage(data));
    },
    [dispatch]
  );

  // Handle typing indicator start
  const handleTypingStart = useCallback(
    (data: TypingIndicator) => {
      dispatch(addTypingIndicator(data));

      // Auto-remove typing indicator after 3 seconds
      const timer = setTimeout(() => {
        dispatch(removeTypingIndicator(data.userId));
      }, 3000);

      return () => clearTimeout(timer);
    },
    [dispatch]
  );

  // Handle typing indicator stop
  const handleTypingStop = useCallback(
    (data: { userId: string }) => {
      dispatch(removeTypingIndicator(data.userId));
    },
    [dispatch]
  );

  // Setup Socket.io listeners
  useEffect(() => {
    if (!socket || !streamId) return;

    socket.on('chat:message', handleChatMessage);
    socket.on('chat:message-deleted', handleMessageDeleted);
    socket.on('chat:message-pinned', handleMessageUpdated);
    socket.on('chat:typing-start', handleTypingStart);
    socket.on('chat:typing-stop', handleTypingStop);

    return () => {
      socket.off('chat:message', handleChatMessage);
      socket.off('chat:message-deleted', handleMessageDeleted);
      socket.off('chat:message-pinned', handleMessageUpdated);
      socket.off('chat:typing-start', handleTypingStart);
      socket.off('chat:typing-stop', handleTypingStop);
    };
  }, [socket, streamId, handleChatMessage, handleMessageDeleted, handleMessageUpdated, handleTypingStart, handleTypingStop]);

  // Send message
  const sendMessage = useCallback(
    (message: string) => {
      if (!socket || !streamId || !message.trim()) return;
      socket.emit('chat:send-message', { streamId, message });
    },
    [socket, streamId]
  );

  // Send typing indicator
  const sendTypingStart = useCallback(() => {
    if (!socket || !streamId) return;
    socket.emit('chat:typing-start', { streamId });
  }, [socket, streamId]);

  const sendTypingStop = useCallback(() => {
    if (!socket || !streamId) return;
    socket.emit('chat:typing-stop', { streamId });
  }, [socket, streamId]);

  // Delete message
  const deleteMessageLocally = useCallback(
    (messageId: string, userId: string) => {
      if (!socket || !streamId) return;
      socket.emit('chat:delete-message', { streamId, messageId, userId });
    },
    [socket, streamId]
  );

  // Pin/unpin message
  const togglePinMessage = useCallback(
    (messageId: string, isPinned: boolean) => {
      if (!socket || !streamId) return;
      socket.emit('chat:pin-message', { streamId, messageId, isPinned });
    },
    [socket, streamId]
  );

  return {
    sendMessage,
    sendTypingStart,
    sendTypingStop,
    deleteMessageLocally,
    togglePinMessage,
  };
}
