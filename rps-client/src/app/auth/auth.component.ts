import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../codegen/client/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authControllerValidate().subscribe(async (value) => {
      if (value.isValid) {
        await this.router.navigate(['game']);
      }
    });
  }

  async login() {
    const username = this.loginForm.controls.username.value;
    if (username == null) return;

    const result = await this.authService.authControllerLogin({
      body: { username },
    });

    const tokenResponse = await firstValueFrom(result);

    this.storageService.setToken(tokenResponse.token);

    await this.router.navigate(['game']);
  }
}
