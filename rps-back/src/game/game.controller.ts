import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { GameModel } from './models/game.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiOperation({ description: 'Lists the possible game types' })
  @ApiResponse({ type: GameModel })
  public async listGames(): Promise<GameModel[]> {
    return this.gameService.listGames();
  }
}
