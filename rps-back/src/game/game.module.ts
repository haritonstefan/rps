import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [MongoModule.forFeature(['games'])],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
