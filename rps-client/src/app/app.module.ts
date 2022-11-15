import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from '../codegen/client/api.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { GameModule } from './game/game.module';
import { API_INTERCEPTOR_PROVIDER, ApiInterceptor } from './api.interceptor';

@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [
    GameModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'http://localhost:3000' }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [ApiInterceptor, API_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
