import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  gameType: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  rounds: number;
}
