import { Component, Input, OnInit } from '@angular/core';
import { MatchModel } from '../../../codegen/client/models/match-model';
import { MatchService } from '../../../codegen/client/services/match.service';
import { firstValueFrom } from 'rxjs';
import { GameDataService } from '../game-data.service';
import { GameModel } from '../../../codegen/client/models/game-model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  @Input() match!: MatchModel;
  public game!: GameModel;

  public opened: boolean = false;

  constructor(
    private gameDataService: GameDataService,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.game = this.gameDataService.getGameData(this.match.gameTypeId);
  }

  async submit(move: number) {
    const result = await firstValueFrom(
      this.matchService.matchControllerSubmitMove({
        id: this.match._id,
        body: { move: move },
      })
    );
  }
}
