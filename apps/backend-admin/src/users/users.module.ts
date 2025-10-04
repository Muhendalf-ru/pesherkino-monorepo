import { Module } from '@nestjs/common';

// Импортируем модель напрямую из пакета @db
import { UserModel } from 'db';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// создаём провайдер для инъекции
const UserModelProvider = {
  provide: 'USER_MODEL',
  useValue: UserModel,
};

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserModelProvider],
  exports: [UsersService],
})
export class UsersModule {}
