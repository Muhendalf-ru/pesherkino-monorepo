import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';

dotenv.config({ path: '../../.env' });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI!), UsersModule],
})
export class AppModule {}
