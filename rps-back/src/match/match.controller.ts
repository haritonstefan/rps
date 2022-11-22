import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dtos/create-match.dto';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { MatchModel } from './models/match.model';
import { User } from '../decorators/user.decorator';
import { SubmitMoveDto } from './dtos/submit-move.dto';

@ApiTags('game', 'match')
@ApiSecurity('bearer')
@Controller('game/match')
@UseGuards(AuthGuard)
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  @ApiOperation({ description: 'Creates a new match.' })
  @ApiCreatedResponse({ type: null })
  public async createMatch(
    @User() user: string,
    @Body() payload: CreateMatchDto,
  ): Promise<void> {
    return this.matchService.createMatch(user, payload);
  }

  @Get('/:id')
  @ApiOperation({ description: 'Retrieves an existing match.' })
  @ApiOkResponse({ type: MatchModel })
  public async getMatch(@Param('id') id: string): Promise<Partial<MatchModel>> {
    return this.matchService.getMatch(id);
  }

  @Get('')
  @ApiOperation({
    description: 'Retrieves the list of matches where the user is involved.',
  })
  @ApiOkResponse({ type: MatchModel, isArray: true })
  public async getUserMatches(
    @User() userId: string,
  ): Promise<Partial<MatchModel>[]> {
    // TODO: Add pagination.
    return this.matchService.getUserMatches(userId);
  }

  @Get('/joinable')
  @ApiOperation({
    description: 'Retrieves a list of matches that could be joined',
  })
  @ApiOkResponse({ type: MatchModel, isArray: true })
  public async getJoinAbleMatches(@User() userId: string) {
    console.log(userId);
    return this.matchService.getJoinAbleMatches(userId);
  }

  @Patch('/:id')
  @ApiOperation({
    description: 'Joins an existing match.',
  })
  @ApiAcceptedResponse({ type: null })
  public async joinMatch(@User() userId: string, @Param('id') matchId: string) {
    return this.matchService.joinMatch(userId, matchId);
  }

  @Post('/:id')
  @ApiOperation({
    description: "Submit the player's move",
  })
  @ApiAcceptedResponse({ type: null })
  public async submitMove(
    @User() userId: string,
    @Param('id') matchId: string,
    @Body() payload: SubmitMoveDto,
  ) {
    return this.matchService.submitMove(matchId, userId, payload.move);
  }
}
