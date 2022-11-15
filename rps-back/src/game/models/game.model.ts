import { Element } from '../dto/element';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GameModel {
  @IsString()
  @ApiProperty()
  _id?: string;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty({ type: Element, isArray: true })
  elements: Element[];
  @IsString()
  @ApiProperty({ type: Number })
  maxPlayers: number;
}
