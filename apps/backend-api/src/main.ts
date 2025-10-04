import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config({ path: '../../.env' }); // путь до корневого .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port =
    process.env.BACKEND_API_PORT || process.env.BACKEND_ADMIN_PORT || 3000;

  await app.listen(Number(port));
  Logger.log(`Backend started on port ${port}`);
}

bootstrap();
