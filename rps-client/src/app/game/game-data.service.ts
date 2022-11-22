import { Injectable } from '@angular/core';
import { GameService } from '../../codegen/client/services/game.service';
import { GameModel } from '../../codegen/client/models/game-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private gameDataMap: Map<string, GameModel> = new Map();

  constructor(private gameService: GameService) {}

  public getGames(): Observable<GameModel[]> {
    const obs = this.gameService.gameControllerListGames();
    obs.subscribe((games) => {
      for (let game of games) {
        this.gameDataMap.set(game._id, game);
      }
    });
    return obs;
  }

  public getGameData(id: string): GameModel {
    console.log(this.gameDataMap);
    console.log(id);
    return this.gameDataMap.get(id) as GameModel;
  }
}
