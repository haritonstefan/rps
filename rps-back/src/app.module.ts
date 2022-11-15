import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from 'nest-mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GameModule } from './game/game.module';
import { MatchModule } from './match/match.module';
import MongoConfigFactory from './mongo-config.factory';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: MongoConfigFactory,
    }),
    AuthModule,
    GameModule,
    MatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
