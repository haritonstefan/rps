import * as mongo from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectCollection } from 'nest-mongodb';
import { GameModel } from './models/game.model';

@Injectable()
export class GameService {
  constructor(
    @InjectCollection('games')
    private readonly gameCollection: mongo.Collection,
  ) {}

  listGames() {
    return this.gameCollection.find<GameModel>({}).toArray();
  }
}
