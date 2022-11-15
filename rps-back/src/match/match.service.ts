import {
  BadRequestException,
  ConflictException,
  UnprocessableEntityException,
  Injectable,
} from '@nestjs/common';
import { CreateMatchDto } from './dtos/create-match.dto';
import { InjectCollection } from 'nest-mongodb';
import { Collection, ObjectId } from 'mongodb';
import { MatchModel, MatchModelWithGame } from './models/match.model';
import { TurnModel } from './models/turn.model';
import { RoundModel } from './models/round.model';

@Injectable()
export class MatchService {
  constructor(
    @InjectCollection('match')
    private readonly matchCollection: Collection<Partial<MatchModel>>,
  ) {}

  async createMatch(userId: string, payload: CreateMatchDto) {
    if (!ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user object id string supplied');
    }

    if (!ObjectId.isValid(payload.gameType)) {
      throw new BadRequestException(
        'Invalid game type object id string supplied',
      );
    }

    const gameTypeOId = new ObjectId(payload.gameType);
    const userOId = new ObjectId(userId);
    await this.matchCollection.insertOne({
      gameTypeId: gameTypeOId,
      createdById: userOId,
      roundCount: payload.rounds,
      players: [userOId],
    });
  }

  async getMatch(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(
        'Invalid object id string representation supplied',
      );
    }
    const OId = new ObjectId(id);
    return this.matchCollection.findOne({
      _id: OId,
    });
  }

  async getUserMatches(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new BadRequestException(
        'Invalid object id string representation supplied',
      );
    }
    const userOId = new ObjectId(userId);
    return this.matchCollection
      .find({
        $or: [
          {
            createdById: userOId,
          },
          {
            players: {
              $elemMatch: { userOId },
            },
          },
        ],
      })
      .toArray();
  }

  async joinMatch(userId: string, matchId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user object id string supplied');
    }
    if (!ObjectId.isValid(matchId)) {
      throw new BadRequestException(
        'Invalid matchId object id string supplied',
      );
    }

    const userOId = new ObjectId(userId);
    const matchOId = new ObjectId(matchId);

    const match = await this.getMatchWithGame(matchOId, userOId);

    if (match.players.length === match.game.maxPlayers) {
      throw new ConflictException('Maximum number of players reached');
    }

    const result = await this.matchCollection.updateOne(
      {
        _id: matchOId,
      },
      {
        $push: {
          players: userOId,
        },
      },
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Supplied match id was not found');
    }
  }

  async submitMove(matchId: string, userId: string, move: number) {
    if (!ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user object id string supplied');
    }
    if (!ObjectId.isValid(matchId)) {
      throw new BadRequestException(
        'Invalid matchId object id string supplied',
      );
    }

    const userOId = new ObjectId(userId);
    const matchOId = new ObjectId(matchId);

    // TODO: I think it makes sense to add transactions here

    const matchWithGame = await this.getMatchWithGame(matchOId, userOId);

    if (matchWithGame.players.find((player) => userOId == player)) {
      throw new BadRequestException(
        'This player did not join this game element supplied',
      );
    }
    if (!matchWithGame.game.elements.find((element) => element.index == move)) {
      throw new BadRequestException('Invalid element supplied');
    }

    if (matchWithGame.game)
      if (matchWithGame.rounds.length == matchWithGame.roundCount) {
        throw new ConflictException('This match is over.');
      }

    const lastRound = matchWithGame.rounds.at(-1);

    if (
      lastRound.turns.find((turn) => turn.playerId == userId) &&
      lastRound.turns.length < matchWithGame.players.length
    ) {
      throw new ConflictException("It's not you turn now.");
    }

    const updateOp = await this.matchCollection.updateOne(
      {
        _id: matchOId,
        rounds: {
          number: lastRound.number,
        },
      },
      [
        {
          $push: {
            'rounds.$.turns': <TurnModel>{ element: move, playerId: userId },
          },
        },
      ],
    );

    if (updateOp.modifiedCount != 1) {
      throw new UnprocessableEntityException('Unexpected data state');
    }

    const match = await this.matchCollection.findOne({ _id: matchOId });

    const roundResult = this.evaluateWinner(match.rounds.at(-1));

    const evaluateWinnerOp = await this.matchCollection.updateOne(
      {
        _id: matchOId,
        rounds: {
          number: roundResult.number,
        },
      },
      {
        $set: {
          'rounds.$.isTie': roundResult.isTie,
          'rounds.$.winnerId': roundResult.winnerId,
        },
      },
    );

    if (evaluateWinnerOp.modifiedCount != 1) {
      throw new UnprocessableEntityException('Unexpected data state');
    }

    /// TODO: handle match finish
  }

  // Hardcoded for rps with 2 players.
  private evaluateWinner(round: RoundModel) {
    const playerOneMove = round.turns[0];
    const playerTwoMove = round.turns[1];

    if (playerOneMove.element === playerTwoMove.element) {
      round.isTie = true;
      return round;
    }

    if ((playerOneMove.element + 1) % 3 === playerTwoMove.element % 3) {
      round.isTie = false;
      round.winnerId = playerOneMove.playerId;

      return round;
    }

    round.isTie = false;
    round.winnerId = playerTwoMove.playerId;
  }

  private async getMatchWithGame(
    matchOId: ObjectId,
    userOId: ObjectId,
  ): Promise<MatchModelWithGame> {
    const matches = await this.matchCollection
      .aggregate<MatchModelWithGame>()
      .match({
        _id: matchOId,
        $or: [
          {
            createdById: userOId,
          },
          {
            players: userOId,
          },
        ],
      })
      .lookup({
        from: 'games',
        localField: 'gameTypeId',
        foreignField: '_id',
        as: 'game',
      })
      .unwind({ path: 'game' })
      .toArray();

    return matches.pop();
  }
}
