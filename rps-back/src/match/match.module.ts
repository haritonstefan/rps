import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [MongoModule.forFeature(['match'])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
