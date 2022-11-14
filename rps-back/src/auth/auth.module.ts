import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [MongoModule.forFeature(['players'])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
