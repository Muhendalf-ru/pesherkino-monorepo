export class CreateUserDto {
  telegramId!: number;
  avatarUrl?: string;
  tariff?: string;
  isAdmin?: boolean;
  invitedBy?: string;
}

export class UpdateUserDto {
  avatarUrl?: string;
  balance?: number;
  tariff?: string;
  tariffExpires?: Date;
  isActive?: boolean;
  isBlocked?: boolean;
  referralsCount?: number;
  supportRequest?: number;
  onboarding?: boolean;
  tags?: string[];
  metadata?: Record<string, any>;
  lastActivity?: Date;
  lastDepositDate?: Date;
}
