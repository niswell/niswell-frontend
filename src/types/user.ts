export type UserRole = 'viewer' | 'creator' | 'admin';

export interface User {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  message: string;
  userId: string;
  accessToken: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  role: UserRole;
}

export interface CreatorProfile {
  userId: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  isVerified: boolean;
  followerCount: number;
  totalEarnings: number;
  streams: any[];
  createdAt: Date;
}

export interface ViewerProfile {
  userId: string;
  displayName: string;
  avatar?: string;
  followingCount: number;
  createdAt: Date;
}

export interface MFASetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface MFAVerifyPayload {
  code: string;
  backupCode?: string;
}
