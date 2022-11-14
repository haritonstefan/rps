import { Injectable } from '@angular/core';

const LOCAL_STORAGE_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public hasToken(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  public setToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  }
}
