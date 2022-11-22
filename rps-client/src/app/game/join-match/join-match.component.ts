import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchModel } from '../../../codegen/client/models/match-model';
import { MatchService } from '../../../codegen/client/services/match.service';

@Component({
  selector: 'app-join-match',
  templateUrl: './join-match.component.html',
  styleUrls: ['./join-match.component.css'],
})
export class JoinMatchComponent implements OnInit {
  matchList!: Observable<MatchModel[]>;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.matchList = this.matchService.matchControllerGetJoinAbleMatches();
  }
}
