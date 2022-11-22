import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatchService } from '../../../codegen/client/services/match.service';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css'],
})
export class CreateMatchComponent implements OnInit {
  @Input() matchCreated!: EventEmitter<null>;

  availableRoundsCounts = [3, 5, 7, 9];
  newGameForm = this.formBuilder.group({
    gameType: '',
    rounds: 3,
  });
  availableGameTypes: Observable<any> = new Observable();

  constructor(
    private formBuilder: FormBuilder,
    private gameDataService: GameDataService,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.availableGameTypes = this.gameDataService.getGames();
    this.availableGameTypes.subscribe((game) => {
      this.newGameForm.controls.gameType.setValue(game[0]._id);
    });
  }

  async onFormSubmit(): Promise<void> {
    const data = {
      gameType: this.newGameForm.controls.gameType.value as string,
      rounds: this.newGameForm.controls.rounds.value as number,
    };

    const matchCreationResult =
      await this.matchService.matchControllerCreateMatch({
        body: data,
      });

    matchCreationResult.subscribe((value) => {
      console.log(value);
    });
  }

  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne._id === optionTwo._id;
  }
}
