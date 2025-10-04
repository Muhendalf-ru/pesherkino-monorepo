import { Body, Controller, Post } from '@nestjs/common';
import type { AuthService } from './auth.service';

@Controller('auth')
export class TelegramAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async telegramLogin(@Body() body: any) {
    // body приходит с фронтенда с Telegram виджета
    const { hash, ...userData } = body;

    // Проверяем подпись Telegram
    const valid = this.authService.checkTelegramAuth(userData, hash);
    if (!valid) {
      return { success: false, message: 'Invalid Telegram auth' };
    }

    // Генерируем токен для админки
    const token = await this.authService.login(userData);
    return { success: true, token, user: userData };
  }
}
