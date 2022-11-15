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

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  declarations: [CreateMatchComponent, MainViewComponent, ListMatchesComponent],
  exports: [CreateMatchComponent],
})
export class GameModule {}

export * from './routes';
