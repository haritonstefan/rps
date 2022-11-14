import { Component, OnInit } from '@angular/core';
import { AuthService } from '../codegen/client/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rps-client';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    firstValueFrom(
      this.authService.authControllerLogin({ body: { username: 'User1' } })
    ).then(console.log);
  }
}
