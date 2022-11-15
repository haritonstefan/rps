import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitMoveDto {
  @IsNumber()
  @IsString()
  @ApiProperty()
  move: number;
}
