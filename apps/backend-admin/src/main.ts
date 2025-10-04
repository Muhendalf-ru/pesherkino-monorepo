import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { setupSwagger } from './setupSwagger';
import { ApiKeyGuard } from './auth/api-key.guard';

dotenv.config({ path: '../../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new ApiKeyGuard());

  setupSwagger(app);

  const port = Number(process.env.BACKEND_ADMIN_PORT || 3003);
  await app.listen(port);
  console.log(`Admin API started at http://localhost:${port}/admin/docs`);
}
bootstrap();
