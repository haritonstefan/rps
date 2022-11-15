import { IsArray, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { RoundModel } from './round.model';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';
import { GameModel } from '../../game/models/game.model';

export class MatchModel {
  @IsNumber()
  @ApiProperty({ type: Number })
  roundCount: number;

  @IsString()
  @ApiProperty({ type: String })
  gameTypeId: ObjectId;

  @IsString()
  @ApiProperty({ type: String })
  createdById: ObjectId;

  @IsArray()
  @Type(() => RoundModel)
  @ApiProperty({ type: RoundModel, isArray: true })
  rounds: RoundModel[];

  @IsArray()
  @Type(() => ObjectId)
  @ApiProperty({ type: String, isArray: true })
  players: ObjectId[];
}

export class MatchModelWithGame extends MatchModel {
  @Type(() => GameModel)
  @ApiProperty({ type: GameModel })
  game: GameModel;
}
