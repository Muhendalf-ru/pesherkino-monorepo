import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  _id!: string;

  @ApiProperty()
  telegramId!: number;

  @ApiProperty({ required: false })
  avatarUrl?: string;

  @ApiProperty()
  balance!: number;

  @ApiProperty({ required: false })
  tariff?: string;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  tariffExpires?: Date;

  @ApiProperty()
  isAdmin!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  lastActivity?: Date;

  @ApiProperty()
  isBlocked!: boolean;

  @ApiProperty()
  referralsCount!: number;

  @ApiProperty({ required: false })
  invitedBy?: string;

  @ApiProperty()
  supportRequest!: number;

  @ApiProperty()
  onboarding!: boolean;

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  lastDepositDate?: Date;

  @ApiProperty({ type: Object, required: false })
  metadata?: Record<string, any>;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}
