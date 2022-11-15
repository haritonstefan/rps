import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatchService } from '../../../codegen/client/services/match.service';
import { Observable, share, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { MatchModel } from '../../../codegen/client/models/match-model';

@Component({
  selector: 'app-list-matches',
  templateUrl: './list-matches.component.html',
  styleUrls: ['./list-matches.component.css'],
})
export class ListMatchesComponent implements OnInit {
  matchList!: Observable<MatchModel[]>;

  stopPolling: Subject<null> = new Subject();
  @Input() matchCreated!: EventEmitter<null>;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.retrieveCurrentMatches();
    this?.matchCreated.subscribe(() => {
      this.stopPolling.next(null);
      this.retrieveCurrentMatches();
    });
  }

  ngOnDestroy() {
    this.stopPolling.next(null);
  }

  private retrieveCurrentMatches() {
    this.matchList = timer(1, 3000).pipe(
      switchMap(() => this.matchService.matchControllerGetUserMatches()),
      share(),
      takeUntil(this.stopPolling)
    );
  }
}
