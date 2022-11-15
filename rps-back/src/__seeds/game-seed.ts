import { MongoClient } from 'mongodb';
import { ISeed } from './i.seed';
import { GameModel } from '../game/models/game.model';

export default class GameSeed implements ISeed {
  public async run(client: MongoClient): Promise<void> {
    await client
      .db('rps')
      .collection<GameModel>('games')
      .insertOne({
        name: 'Rock Paper Scissors',
        maxPlayers: 2,
        elements: [
          {
            name: 'Rock',
            index: 0,
          },
          {
            name: 'Paper',
            index: 1,
          },
          {
            name: 'Scissors',
            index: 2,
          },
        ],
      });
  }
}
