export type MessageType = 'text' | 'tip_notification' | 'system';

export interface ChatMessage {
  id: string;
  streamId: string;
  senderProfileId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  messageType: MessageType;
  isPinned: boolean;
  createdAt: Date;
}

export interface TypingIndicator {
  userId: string;
  username: string;
  streamId: string;
}

export interface ChatFilter {
  search?: string;
  pinned?: boolean;
  messageType?: MessageType;
}
