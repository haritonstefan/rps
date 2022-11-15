import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TurnModel {
  @IsString()
  @ApiProperty({ type: String })
  playerId: string;

  @IsString()
  @ApiProperty({ type: String })
  element: number;
}
