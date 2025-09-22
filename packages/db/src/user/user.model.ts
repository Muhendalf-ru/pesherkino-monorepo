import {
  prop as Prop,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true, // автоматически createdAt и updatedAt
  },
})
export class User {
  @Prop({ required: true, unique: true })
  telegramId!: number;

  @Prop()
  avatarUrl?: string;

  @Prop({ default: 0 })
  balance!: number;

  @Prop()
  tariff?: string;

  @Prop()
  tariffExpires?: Date;

  @Prop({ default: false })
  isAdmin!: boolean;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop()
  lastActivity?: Date;

  @Prop({ default: false })
  isBlocked!: boolean;

  @Prop({ default: 0 })
  referralsCount!: number;

  @Prop()
  invitedBy?: string;

  @Prop({ default: 0 })
  supportRequest!: number;

  @Prop({ default: false })
  onboarding!: boolean;

  @Prop({ type: () => [String], default: [] })
  tags!: string[];

  @Prop()
  lastDepositDate?: Date;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  // createdAt и updatedAt будут добавлены автоматически через timestamps
}

export const UserModel = getModelForClass(User);
