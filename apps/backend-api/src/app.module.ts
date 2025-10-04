import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from 'db';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    MongooseModule.forFeature([
      { name: UserModel.modelName, schema: UserModel.schema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
