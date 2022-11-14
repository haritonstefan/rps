import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './dto/game';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiResponse({ type: Game })
  public async listGames(): Promise<Game[]> {
    return this.gameService.listGames();
  }
}
