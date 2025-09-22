import { User } from "./user.model";

export type UserDocument = User & { _id: string };

export interface IUserResponse {
  id: string;
  telegramId: number;
  avatarUrl?: string;
  balance: number;
  tariff?: string;
  tariffExpires?: Date;
  isAdmin: boolean;
  isActive: boolean;
  lastActivity?: Date;
  isBlocked: boolean;
  referralsCount: number;
  invitedBy?: string;
  supportRequest: number;
  onboarding: boolean;
  tags: string[];
  lastDepositDate?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
