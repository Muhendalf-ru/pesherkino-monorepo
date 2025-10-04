import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const apiKey =
      req.headers['x-api-key'] || req.query.apiKey || process.env.ADMIN_API_KEY;
    const expected = process.env.ADMIN_API_KEY;
    if (!expected) {
      // если не настроен — запрещаем
      throw new UnauthorizedException('Admin API key not set on server');
    }
    if (apiKey !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
