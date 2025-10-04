import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TelegramAuthController } from './telegram.controller';

@Module({
  controllers: [TelegramAuthController],
  providers: [AuthService],
})
export class AuthModule {}
