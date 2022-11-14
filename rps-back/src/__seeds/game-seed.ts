import { MongoClient } from 'mongodb';
import { ISeed } from './i.seed';
import { Game } from '../game/dto/game';

export default class GameSeed implements ISeed {
  public async run(client: MongoClient): Promise<void> {
    await client
      .db('rps')
      .collection<Game>('games')
      .insertOne({
        name: 'Rock Paper Scissors',
        elements: [
          {
            name: 'Rock',
            beats: ['Scissors'],
          },
          {
            name: 'Paper',
            beats: ['Rock'],
          },
          {
            name: 'Scissors',
            beats: ['Paper'],
          },
        ],
      });
  }
}
