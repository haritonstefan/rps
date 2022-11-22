import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { CreateMatchComponent } from './create-match/create-match.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainViewComponent } from './main-view/main-view.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ListMatchesComponent } from './list-matches/list-matches.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatchComponent } from './match/match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { MatRadioModule } from '@angular/material/radio';
import { GameDataService } from './game-data.service';
import { JoinMatchComponent } from './join-match/join-match.component';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatRadioModule,
  ],
  providers: [GameDataService],
  declarations: [
    CreateMatchComponent,
    MainViewComponent,
    ListMatchesComponent,
    MatchComponent,
    MatchHistoryComponent,
    JoinMatchComponent,
  ],
  exports: [CreateMatchComponent],
})
export class GameModule {}

export * from './routes';
