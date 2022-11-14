import { Element } from './element';
import { ApiProperty } from '@nestjs/swagger';

export class Game {
  @ApiProperty()
  _id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Element, isArray: true })
  elements: Element[];
}
