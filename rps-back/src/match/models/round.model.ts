import { IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { TurnModel } from './turn.model';
import { ApiProperty } from '@nestjs/swagger';

export class RoundModel {
  @IsNumber()
  @ApiProperty({ type: Number })
  number: number;

  @IsArray()
  @Type(() => TurnModel)
  @ApiProperty({ type: TurnModel, isArray: true })
  turns: TurnModel[];

  @IsBoolean()
  @ApiProperty({ type: Boolean, required: false })
  isTie?: boolean;

  @IsNumber()
  @ApiProperty({ type: String })
  winnerId: string;
}
