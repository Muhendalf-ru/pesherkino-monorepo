import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private botToken = process.env.TELEGRAM_BOT_TOKEN;
  private jwtSecret = process.env.JWT_SECRET || 'supersecret';

  // Проверка подписи Telegram
  checkTelegramAuth(data: Record<string, any>, hash: string): boolean {
    const checkString = Object.keys(data)
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join('\n');

    const secretKey = crypto
      .createHash('sha256')
      .update(this.botToken!)
      .digest();
    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');
    return hmac === hash;
  }

  // Генерация JWT для фронтенда
  async login(user: Record<string, any>): Promise<string> {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' });
  }
}
